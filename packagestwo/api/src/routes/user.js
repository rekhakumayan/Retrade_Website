const UserController = require("../controllers/User");
const { users } = require("../validation/user");

module.exports = {
  plugin: {
    async register(server) {
      console.log("User Routes loaded");
      server.route([
        {
          method: "GET",
          path: "/{userId}",
          options: {
            auth: "jwt",
            tags: ["api", "user"],
            pre: [{ method: server.methods.isCustomer }],
            handler: UserController.getUser,
            description: "Get user details with addresses — password excluded",
          },
        },

        {
          method: "PATCH",
          path: "/{userId}",
          options: {
            auth: "jwt",
            tags: ["api", "user"],
            pre: [],   //{ method: server.methods.isCustomer } it has been removed 
            validate: {
              payload: users.updateUser.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => {
                throw err;
              },
            },
            handler: UserController.updateUser,
            description:
              "Update name or manage addresses (add/update/delete/setDefault)",
          },
        },
        {
          method: "PATCH",
          path: "/{userId}/avatar",
          options: {
            auth: "jwt",
            tags: ["api", "user"],

            payload: {
              output: "file",
              parse: true,
              multipart: true,
              allow: "multipart/form-data"
            },

            handler: UserController.updateAvatar,

            description: "Update user avatar",
          },
        },

        {
          method: "GET",
          path: "/customers",
          options: {
            auth: "jwt",
            tags: ["api", "users"],
            handler: UserController.fetchCustomers,
            description: "Fetch customers for the logged-in vendor",
          },
        },

        {
          method: "POST",
          path: "/forgot-password",
          options: {
            auth: false,
            tags: ["api", "auth"],
            handler: UserController.forgotPassword,
            description: "Send reset password email",
          },
        } // password reset [1803]
      ]);
    },
    version: process.env.API_VERSION,
    name: "user",
  },
};
