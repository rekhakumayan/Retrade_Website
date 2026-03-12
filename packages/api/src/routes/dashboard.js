const DashboardController = require("../controllers/dashboard");

module.exports = {
  plugin: {
    async register(server) {

      server.route([
        {
          method: "GET",
          path: "/",
          options: {
            auth: "jwt",
            tags: ["api", "Dashboard"],
            handler: DashboardController.get,
            description: "Get vendor dashboard data"
          }
        }
      ]);

    },

    version: process.env.API_VERSION,
    name: "dashboard"
  }
};