const OrderService = require("../services/order");
const errorHandler = require("../lib/utils/ErrorHandler");

class OrderController {

  async get(request, h) {
    try {

      const orders = await OrderService.get();

      return h.response({
        statusCode: 200,
        message: "Orders fetched successfully",
        data: orders
      }).code(200);

    } catch (err) {
      return errorHandler.error(err, {
        msg: "Fetch failed",
        code: 500
      });
    }
  }

}

module.exports = new OrderController();