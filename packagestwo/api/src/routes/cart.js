const CartController = require('../controllers/Cart');
const { cart } = require('../validation/cart');

module.exports = {
  plugin: {
    name: 'cart',
    version: '1.0.0',
    async register(server) {
      server.route([
        {
          method: 'GET',
          path: '/',
          options: {
            auth: { mode: 'optional', strategy: 'jwt' },
            tags: ['api', 'cart'],
            handler: CartController.getCart,
            description: 'Get cart — works for guest and logged-in users',
          },
        },
        {
          method: 'POST',
          path: '/',
          options: {
            auth: { mode: 'optional', strategy: 'jwt' },
            tags: ['api', 'cart'],
            validate: {
              payload: cart.addToCart.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            handler: CartController.addToCart,
            description: 'Add item to cart — works for guest and logged-in users',
          },
        },
        {
          method: 'PATCH',
          path: '/{cartItemId}',
          options: {
            auth: { mode: 'optional', strategy: 'jwt' },
            tags: ['api', 'cart'],
            validate: {
              params: cart.updateQuantity.params,
              payload: cart.updateQuantity.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            handler: CartController.updateQuantity,
            description: 'Update cart item quantity using + / - button',
          },
        },
        {
          method: 'DELETE',
          path: '/{cartItemId}',
          options: {
            auth: { mode: 'optional', strategy: 'jwt' },
            tags: ['api', 'cart'],
            validate: {
              params: cart.cartItemId.params,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            handler: CartController.removeItem,
            description: 'Remove item from cart entirely',
          },
        },
        {
          method: 'POST',
          path: '/merge',
          options: {
            auth: 'jwt',
            tags: ['api', 'cart'],
            handler: CartController.mergeCart,
            description: 'Merge guest cart into user cart after login',
          },
        },
      ]);
    },
  },
};
