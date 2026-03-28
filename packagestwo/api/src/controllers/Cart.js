const ErrorHandler = require("../lib/utils/ErrorHandler");
const CartServices = require("../services/Cart");
const Product = require("../models/product");
const Vendor = require("../models/Vendor");

const {
  calculateCartSummary,
  calculateItemTotal,
} = require("../lib/utils/CartCalculation");

const cartServices = new CartServices();

const getIdentifier = (request) => {
  if (
    request.auth &&
    request.auth.isAuthenticated &&
    request.auth.credentials
  ) {
    return { userId: request.auth.credentials.userId };
  }
  const sessionId = request.headers["x-session-id"];
  return { sessionId };
};

class CartController {
  static async getCart(request, h) {
    try {
      const identifier = getIdentifier(request);

      if (!identifier.userId && !identifier.sessionId) {
        return h
          .response({
            statusCode: 400,
            message: "Session ID or login required",
          })
          .code(400);
      }
      const cart = await cartServices.findCartWithProducts(identifier);

      if (!cart || cart.items.length === 0) {
        return h
          .response({
            statusCode: 200,
            message: "Cart is empty",
            data: {
              vendorId: null,
              items: [],
              summary: {
                subtotal: 0,
                gst: 0,
                total: 0,
              },
            },
          })
          .code(200);
      }

      const items = cart.items
        .map((item) => {
          const product = item.productId;
          if (!product) return null;

          return {
            cartItemId: item._id,
            product: {
              id: product._id,
              name: product.name,
              description: product.description,
              image: product.image,
              price: {
                original: product.price.original,
                discount: product.price.discount,
              },
              stock: product.stock,
            },
            quantity: item.quantity,
            itemTotal: calculateItemTotal(product, item.quantity),
            addedAt: item.addedAt,
          };
        })
        .filter(Boolean);

      const summary = calculateCartSummary(items);
      return h
        .response({
          statusCode: 200,
          message: "Cart fetched successfully",
          data: {
            vendorId: cart.vendorId,
            items,
            summary,
          },
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async addToCart(request, h) {
    try {
      const identifier = getIdentifier(request);

      if (!identifier.userId && !identifier.sessionId) {
        return h
          .response({
            statusCode: 400,
            message: "Session ID or login required",
          })
          .code(400);
      }

      const { productId, quantity } = request.payload;

      const product = await Product.findById(productId);
      if (!product) {
        return h
          .response({ statusCode: 404, message: "Product not found" })
          .code(404);
      }

      if (product.status !== "approved") {
        return h
          .response({
            statusCode: 400,
            message: "This product is not available for purchase",
          })
          .code(400);
      }

      const vendor = await Vendor.findById(product.vendorId);
      if (!vendor) {
        return h
          .response({ statusCode: 404, message: "Vendor not found" })
          .code(404);
      }

      const existingCart = await cartServices.findCartByIdentifier(identifier);

      if (existingCart) {
        const existingItem = existingCart.items.find(
          (item) => item.productId.toString() === productId.toString(),
        );

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;

          await cartServices.updateItemQuantity(
            identifier,
            existingItem._id,
            newQuantity,
          );
          const cartCount = await cartServices.getCartCount(identifier);
          return h
            .response({
              statusCode: 200,
              message: "Cart quantity updated",
              data: { cartCount },
            })
            .code(200);
        }
      }

      await cartServices.addItem(identifier, productId, vendor._id, quantity);
      const cartCount = await cartServices.getCartCount(identifier);
      return h
        .response({
          statusCode: 200,
          message: "Item added to cart",
          data: { cartCount },
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async updateQuantity(request, h) {
    try {
      const identifier = getIdentifier(request);
      const { cartItemId } = request.params;
      const { quantity } = request.payload;

      const cart = await cartServices.findCartByIdentifier(identifier);

      if (!cart) {
        return h
          .response({
            statusCode: 404,
            message: "Cart not found",
          })
          .code(404);
      }

      const cartItem = cart.items.find(
        (item) => item._id.toString() === cartItemId.toString(),
      );

      if (!cartItem) {
        return h
          .response({
            statusCode: 404,
            message: "Cart item not found",
          })
          .code(404);
      }

      // update quantity
      await cartServices.updateItemQuantity(identifier, cartItemId, quantity);

      // fetch updated cart
      const updatedCart = await cartServices.findCartWithProducts(identifier);

      const items = updatedCart.items
        .map((item) => {
          const product = item.productId;
          if (!product) return null;

          return {
            cartItemId: item._id,
            product: {
              id: product._id,
              name: product.name,
              description: product.description,
              image: product.image,
              price: {
                original: product.price.original,
                discount: product.price.discount,
              },
              stock: product.stock,
            },
            quantity: item.quantity,
            itemTotal: calculateItemTotal(product, item.quantity),
            addedAt: item.addedAt,
          };
        })
        .filter(Boolean);

      return h
        .response({
          statusCode: 200,
          message: "Quantity updated successfully",
          data: { items },
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async removeItem(request, h) {
    try {
      const identifier = getIdentifier(request);
      const { cartItemId } = request.params;

      const cart = await cartServices.findCartByIdentifier(identifier);
      if (!cart) {
        return h
          .response({ statusCode: 404, message: "Cart not found" })
          .code(404);
      }

      const itemExists = cart.items.find(
        (item) => item._id.toString() === cartItemId.toString(),
      );
      if (!itemExists) {
        return h
          .response({ statusCode: 404, message: "Cart item not found" })
          .code(404);
      }

      await cartServices.removeItem(identifier, cartItemId);
      const cartCount = await cartServices.getCartCount(identifier);
      return h
        .response({
          statusCode: 200,
          message: "Item removed from cart",
          data: { cartCount },
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async mergeCart(request, h) {
    try {
      const userId = request.auth.credentials.userId;
      const sessionId = request.headers["x-session-id"];

      if (!sessionId) {
        return h
          .response({
            statusCode: 400,
            message: "Session ID is required",
          })
          .code(400);
      }

      await cartServices.mergeGuestCart(sessionId, userId);
      const cartCount = await cartServices.getCartCount({ userId });
      return h
        .response({
          statusCode: 200,
          message: "Cart merged successfully",
          data: { cartCount },
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }
}

module.exports = CartController;
