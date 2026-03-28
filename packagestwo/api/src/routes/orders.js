const OrdersController = require("../controllers/Orders");
const { orders } = require("../validation/orders");

module.exports = {
  plugin: {
    async register(server) {
      server.route([
        {
          method: "POST",
          path: "/",
          options: {
            auth: "jwt",
            tags: ["api", "orders"],
            validate: {
              payload: orders.createOrder.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => {
                throw err;
              },
            },
            pre: [],
            handler: OrdersController.createOrders,
            description: "Create a new order",
          },
        },

        {
          method: "GET",
          path: "/",
          options: {
            auth: "jwt",
            tags: ["api", "orders"],
            handler: OrdersController.getOrders,
            description: "Get all orders",
          },
        },

        {
          method: "GET",
          path: "/{orderId}",
          options: {
            auth: "jwt",
            tags: ["api", "orders"],
            handler: OrdersController.getOrderById,
            description: "Get order details by orderId",
          },
        },
        
        {
          method: "PATCH",
          path: "/{orderId}",
          options: {
            auth: "jwt",
            tags: ["api", "orders"],
            validate: {
              payload: orders.updateOrder.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => {
                throw err;
              },
            },
            handler: OrdersController.updateOrder,
            description: "Update order  address, payment, status and tracking",
          },
        },

         {
          method: 'GET',
          path: '/vendor-dashboard',
          options: {
            auth: 'jwt',
            tags: ['api', 'orders'],
            handler: OrdersController.getVendorDashboard,
            description: 'Get all orders'
          }
        },

      ]);
    },
    version: process.env.API_VERSION,
    name: "orders",
  },
};
