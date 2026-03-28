const ProductController = require("../controllers/product");
const Validation = require("../validation/product");

module.exports = {
  plugin: {
    name: "product",
    version: "1.0.0",

    async register(server) {

      server.route([
        {
          method: "POST",
          path: "/",
          options: {
            auth: "jwt",
            tags: ["api", "Product"],

            validate: Validation.validateProduct,
            handler: ProductController.create
          }
        },

        {
          method: "GET",
          path: "/",
          options: {
            auth:false,
            tags: ["api", "Product"],
            handler: ProductController.get
          }
        },
       
        {
          method: "PATCH",
          path: "/{id}",
          options: {
            auth: false,
            tags: ["api", "Product"],

            validate: Validation.updateProduct,
            handler: ProductController.update
          }
        },

        {
          method: "DELETE",
          path: "/{id}",
          options: {
            auth: false,
            tags: ["api", "Product"],
            handler: ProductController.delete
          }
        }
      ]);
    }
  }
};