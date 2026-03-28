// routes/notificationRoutes.js

const NotificationController = require("../controllers/Notification");

module.exports = {
  plugin: {
    name: "notification-routes",

    register: async function (server) {

      server.route([
        {
          method: "GET",
          path: "/",
          options: {
            auth: "jwt",
            tags: ["api", "notifications"],
          },
          handler: NotificationController.getNotifications,
        },

        {
          method: "PATCH",
          path: "/read",
          options: {
            auth: "jwt",
            tags: ["api", "notifications"],
          },
          handler: NotificationController.updateReadStatus,
        },
      ]);
    },
  },
};