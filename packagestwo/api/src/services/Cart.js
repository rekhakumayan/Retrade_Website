const Cart = require('../models/Cart');
const ErrorHandler = require('../lib/utils/ErrorHandler');

class CartServices {

  buildFilter(identifier) {
    if (identifier.userId) return { userId: identifier.userId };
    return { sessionId: identifier.sessionId };
  }

  async findCart(filter, populate = null) {
    try {
      const query = Cart.findOne(filter).sort({createdAt: -1});
      if (populate) query.populate(populate);
      const data = await query;
      return await data;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updateCart(filter, update, options = { new: true }) {
    try {
      return await Cart.findOneAndUpdate(filter, update, options);
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async findCartByIdentifier(identifier) {
    return this.findCart(this.buildFilter(identifier));
  }

  async findCartWithProducts(identifier) {
    return this.findCart(this.buildFilter(identifier), {
      path: 'items.productId',
      select: 'name description price image stock status user',
    });
  }

  async addItem(identifier, productId, vendorId, quantity) {
    try {
      const filter = this.buildFilter(identifier);
      const cart = await this.findCart(filter);

      if (!cart) {
        return await Cart.create({
          ...identifier,
          vendorId,
          items: [{ productId, quantity, addedAt: new Date() }],
        });
      }

      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItem) {
        return await this.updateCart(
          { ...filter, "items._id": existingItem._id },
          { $inc: { "items.$.quantity": quantity } }
        );
      }

      return await this.updateCart(
        filter,
        { $push: { items: { productId, quantity, addedAt: new Date() } } }
      );

    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updateItemQuantity(identifier, cartItemId, quantity) {
    return this.updateCart(
      { ...this.buildFilter(identifier), 'items._id': cartItemId },
      { $set: { 'items.$.quantity': quantity } }
    );
  }

  async removeItem(identifier, cartItemId) {
    return this.updateCart(
      this.buildFilter(identifier),
      { $pull: { items: { _id: cartItemId } } }
    );
  }

  async getCartCount(identifier) {
    try {
      const cart = await this.findCart(this.buildFilter(identifier));
      if (!cart || cart.items.length === 0) return 0;
      return cart.items.reduce((total, item) => total + item.quantity, 0);
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async mergeGuestCart(sessionId, userId) {
    try {
      const guestCart = await this.findCart({ sessionId });
      if (!guestCart) return;

      const userCart = await this.findCart({ userId });

      // If user has no cart → convert guest cart
      if (!userCart) {
        await Cart.updateOne(
          { sessionId },
          { $set: { userId, sessionId: null } }
        );
        return;
      }

      // Merge items
      const mergedItems = [...userCart.items];

      guestCart.items.forEach((gItem) => {
        const existing = mergedItems.find(
          (uItem) =>
            uItem.productId.toString() === gItem.productId.toString()
        );

        if (existing) {
          existing.quantity += gItem.quantity;
        } else {
          mergedItems.push(gItem);
        }
      });

      await Cart.updateOne(
        { userId },
        { $set: { items: mergedItems } }
      );

      // Remove guest cart
      await Cart.deleteOne({ sessionId });

    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

}

module.exports = CartServices;