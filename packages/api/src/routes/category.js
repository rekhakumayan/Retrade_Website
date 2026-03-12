const CategoryController = require('../controllers/category.js');
const CategoryValidation = require('../validation/category.js');

module.exports = {
  plugin: {
    async register(server) {
      server.route([
        {
          method: 'POST',
          path: '/',
          options: {
            auth: "jwt", // later change to admin auth
            tags: ['api', 'Category'],
            validate: CategoryValidation.categorySchema,
            pre: [],
            handler: CategoryController.create,
            description: 'Add new category',
          },
        },

        {
          method: 'GET',
          path: '/',
          options: {
            auth: "jwt",
            tags: ['api', 'Category'],
            validate: {},
            pre: [],
            handler: CategoryController.get,
            description: 'Get all categories',
          },
        },

        {
          method: "DELETE",
          path: "/{id}",
          options: {
            auth: "jwt",
            tags: ["api", "Product"],
            handler: CategoryController.delete
          }
        }
      ]);
    },

    version: process.env.API_VERSION,
    name: 'category',
  },
};