const categoryService = require("../services/category");
const errorHandler = require("../lib/utils/ErrorHandler");
const VendorServices = require("../services/Vendor")
const vendorServices = new VendorServices()

class CategoryController {
  //CREATE
  async create(request, h) {
    try {
      const userId = request.auth.credentials.userId;
      const vendor = await vendorServices.getVendor(userId);
      const category = await categoryService.create({ ...request.payload, vendorId: vendor._id });

      return h.response({
        statusCode: 201,
        message: "Category added successfully",
        data: category
      }).code(201);

    } catch (err) {
      return errorHandler.error(err, {
        msg: "Failed to add categories",
        code: 500
      });
    }
  }

//GET

  async get(request, h) {
    try {

      let { where = {}, options } = request.parsedQuery;
      const credentials = request.auth?.credentials;

      if (credentials?.role === "partner") {
        const vendor = await vendorServices.getVendor(credentials.userId);
        where.vendorId = vendor._id;
      }

      const result = await categoryService.get(where, options);

      return h.response({
        statusCode: 200,
        message: "Categories fetched successfully",
        data: result
      }).code(200);

    } catch (err) {
      return errorHandler.error(err, {
        msg: "Fetch failed",
        code: 500
      });
    }
  }

  //DELETE
  async delete(request, h) {
    try {
      const { id } = request.params;
      const product = await categoryService.delete(id);
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

module.exports = new CategoryController();