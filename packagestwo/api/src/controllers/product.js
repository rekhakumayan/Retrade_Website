const ProductService = require("../services/product");
const errorHandler = require("../lib/utils/ErrorHandler");
const VendorServices = require("../services/Vendor")
const vendorServices = new VendorServices()

class ProductController {
  //CREATE
  async create(request, h) {
    try {
      const userId = request.auth.credentials.userId;     
      const vendor = await vendorServices.getVendor(userId)

      if (!vendor) throw new Error('You are not a vendor');
      if (vendor.status !== 'active') throw new Error('vendor not approved');

      const productData = {
        ...request.payload,
        vendorId: vendor._id,
      };

      const product = await ProductService.create(productData)

      return h.response({
        statusCode: 201,
        message: "Product created successfully",
        data: product,
      }).code(201);

    } catch (err) {
      return errorHandler.error(err, { msg: "Creation failed", code: 500 });
    }
  }


// GET
  async get(request, h) {
    try {
       console.log("---------------------------------------------------------------------I AM WITHIN PRODUCT CONTROLLER ")
      let { where = {}, options } = request.parsedQuery;
      const vendorId = request.query.vendorId; 
      if (!vendorId) {
        return h.response({
          statusCode: 400,
          message: "vendorId is required"
        }).code(400);
      }
      where.vendorId = vendorId
      // convert name[$regex] query to real Mongo regex
     // handle regex search
      if (where.search) {
        const pattern = new RegExp(where.search, "i");  

        where.$or = [
          { name: pattern },
          { "categoryData.name": pattern }
        ];

        delete where.search; // remove raw search key
      }
     
      const result = await ProductService.get(where, options);

      return h.response({
        statusCode: 200,
        message: "Products fetched successfully",
        data: result
      }).code(200);

    } catch (err) {
      return errorHandler.error(err, { msg: "Fetch failed", code: 500 });
    }
  }


  //UPDATE
  async update(request, h) {
    try {
      const { id } = request.params;
      const payload = request.payload;
      const product = await ProductService.update(id, payload);
      if (!product) {
        return h.response({
          statusCode: 404,
          message: "Product not found",
        }).code(404);
      }
      return h.response({
        statusCode: 200,
        message: "Product updated successfully",
        data: product
      }).code(200);
    } catch (err) {
      return errorHandler.error(err, { msg: "Update failed", code: 500 });
    }
  }

  //DELETE
  async delete(request, h) {
    try {
      const { id } = request.params;
      const product = await ProductService.delete(id);

      if (!product) {
        return h.response({
          statusCode: 404,
          message: "Product not found",
        }).code(404);
      }
      return h.response({
        statusCode: 200,
        message: "Product deleted successfully",
      }).code(200);

    } catch (err) {
      return errorHandler.error(err, { msg: "Delete failed", code: 500 });
    }
  }
}

module.exports = new ProductController();



