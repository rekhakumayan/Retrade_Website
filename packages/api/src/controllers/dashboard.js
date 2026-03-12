const dashboardService = require("../services/dashboard");
const VendorServices = require("../services/Vendor");
const errorHandler = require("../lib/utils/ErrorHandler");

const vendorServices = new VendorServices();

class DashboardController {

  async get(request, h) {

    try {

      const userId = request.auth.credentials.userId;
      const vendor = await vendorServices.getVendor(userId);

      if (!vendor) {
        return h.response({
          statusCode: 404,
          message: "Vendor not found"
        }).code(404);
      }

      const dashboard = await dashboardService.getDashboardData(vendor._id);

      return h.response({
        statusCode: 200,
        message: "Dashboard fetched successfully",
        data: dashboard
      }).code(200);

    } catch (err) {

      return errorHandler.error(err, {
        msg: "Dashboard fetch failed",
        code: 500
      });
    }
  }

}

module.exports = new DashboardController();