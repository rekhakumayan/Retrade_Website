
const notificationService = require("../services/Notification");
const errorHandler = require("../lib/utils/ErrorHandler");
const VendorServices = require("../services/Vendor")
const vendorServices = new VendorServices()

class NotificationController {

  static async getNotifications(request, h) {
    try {
      const userId = request.auth.credentials.userId;
      const vendor = await vendorServices.getVendor(userId)
      const result = await notificationService.getNotifications(
        { vendorId: vendor._id }
      );

      return h.response({
        statusCode: 200,
        message: "Notifications fetched successfully",
        data: result,
      }).code(200);

    } catch (err) {
      return errorHandler.error(err, {
        msg: "Failed to fetch notifications",
        code: 500
      });
    }
  }
  
// MARK AS READ

  static async updateReadStatus(request, h) {
    try {
      const userId = request.auth.credentials.userId;
      const vendor = await vendorServices.getVendor(userId)
      const vendorId = vendor._id
      const { id } = request.query;

      if (id) {
        await notificationService.markOneAsRead(id);
      }
      else {
        await notificationService.markAllAsRead(vendorId);
      }

      return h.response({
        statusCode: 200,
        message: id
          ? "Notification marked as read"
          : "All notifications marked as read",
      }).code(200);

    } catch (err) {
      return errorHandler.error(err, {
        msg: "Failed to mark  notification(s) as read",
        code: 500
      });
    }
  }
}

module.exports = NotificationController;