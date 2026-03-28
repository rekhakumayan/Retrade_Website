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
            auth: "jwt", 
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
            auth: false, 
            tags: ['api', 'Category'],
            pre: [],
            handler: CategoryController.get,
            description: 'Get All Categoies',
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