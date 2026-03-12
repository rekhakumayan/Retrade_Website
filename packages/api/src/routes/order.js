const OrderController = require("../controllers/order");

module.exports = {
  plugin: {
    name: "orders",
    version: "1.0.0",

    async register(server) {

      server.route([
        {
          method: "GET",
          path: "/",
          options: {
            auth: "jwt",
            tags: ["api", "Orders"],
            handler: OrderController.get
          }
        }
      ]);

    }
  }
};