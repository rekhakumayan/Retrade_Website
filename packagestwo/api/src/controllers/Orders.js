const ErrorHandler = require('../lib/utils/ErrorHandler');
const OrdersServices = require('../services/Orders');
const ProductSchema = require('../models/product');
const OrdersSchema = require("../models/Orders")
const VendorServices = require('../services/Vendor')
const NotificationService = require("../services/Notification")
const vendorServices = new VendorServices();
const { calculateCartSummary, calculateItemTotal } = require('../lib/utils/CartCalculation');
const mongoose = require("mongoose");


const ordersServices = new OrdersServices();


class OrdersController {

  // CREATE ORDER
  static async createOrders(request, h) {
    try {
      const payload = request.payload;

      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.tracking;
      delete payload.addedAt;

      payload.userId = request.auth.credentials.userId;
      payload.orderId = `ORD-${Date.now()}`;

      // fetch all products — via service
      const products = await ordersServices.getProductsByIds(
        payload.items.map(item => item.productId)
      );

      if (products.length === 0) {
        throw new Error("No products found");
      }

      const itemsWithPrice = payload.items.map((item) => {
        const product = products.find(
          (p) => p._id.toString() === item.productId,
        );
        if (!product)
          throw new Error(`Product not found: ${item.productId}`);
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: calculateItemTotal(product, item.quantity),
        };
      });

      const summary = calculateCartSummary(
        itemsWithPrice.map((i) => ({ ...i, itemTotal: i.price })),
      );

      payload.items = itemsWithPrice;
      payload.priceDetails = {
        price: summary.subtotal,
        gst: summary.gst,
        coupon: 0,
        deliveryCharges: 0,
        extraCharges: 0,
        totalAmount: summary.total,
      };

      payload.payment = {
        method: payload.payment?.method || 'cod',
        amount: summary.total,
        addedAt: new Date(),
        status: 'confirmed'
      };

      payload.status = 'placed';

      payload.tracking = [
        {
          status: 'placed',
          addedAt: Date.now()
        }];

      const order = await ordersServices.createOrder(payload);

      await NotificationService.createNotification({
        vendorId: payload.vendorId,
        title: "New Order",
        message: `New order #${order.orderId} from ${order.address.fullName} worth ₹${order.priceDetails.totalAmount}.`
        , isRead: false,
      });
      return h.response({
        statusCode: 201,
        message: 'Order created successfully',
        data: order
      }).code(201);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  //GET ORDERS
  static async getOrders(request, h) {
    try {
      const { where, options } = request.parsedQuery
      const { userId, role } = request.auth.credentials;

      if (role === 'customer') {
        where.userId = userId;
      }

  
      if (role === 'vendor') {
        const vendor = await vendorServices.getVendor(userId);
        if (!vendor) {
          return h.response({
            statusCode: 404,
            message: 'Vendor not found'
          }).code(404);
        }
        where.vendorId = vendor._id;
      }

      // const orders = await ordersServices.getOrders(where, options);

      const queryUserId = where.userId || request.query.userId;
      const page = options.page || Number(request.query.page) || 1;

      // userId string → ObjectId
      const parsedWhere = {
        ...where,
        ...(queryUserId && {
          userId: new mongoose.Types.ObjectId(queryUserId),
        }),
      };

      const parsedOptions = {
        ...options,
        page,
        limit: options.limit || 10,
        sort: options.sort || { createdAt: -1 },
      };

      const orders = await ordersServices.getOrders(parsedWhere, parsedOptions);

      return h
        .response({
          statusCode: 200,
          message: "Orders fetched successfully",
          data: orders,
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async getOrderById(request, h) {
    try {
      const { orderId } = request.params;
      const order = await ordersServices.getOrderById(orderId);
      if (!order) {
        return h
          .response({ statusCode: 404, message: "Order not found" })
          .code(404);
      }
      return h
        .response({
          statusCode: 200,
          message: "Order fetched successfully",
          data: order,
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  //UPDATE ORDER
  static async updateOrder(request, h) {
    try {
      const { orderId } = request.params;
      const payload = request.payload;

       const existingOrder = await OrdersSchema.findOne({ orderId });
      if (payload.payment?.method) {
       
        if (!existingOrder) {
          return h.response({
            statusCode: 404,
            message: 'Order not found'
          }).code(404);
        }


        payload.payment = {
          method: payload.payment.method,
          amount: existingOrder.priceDetails.totalAmount, // ← from DB
          date: new Date(),
          status: 'confirmed'
        };
        payload.status = 'placed';
      }

      const order = await ordersServices.updateOrder(orderId, payload);

      if (!order) {
        return h
          .response({
            statusCode: 404,
            message: "Order not found",
          })
          .code(404);
      }
      await NotificationService.createNotification({
        vendorId: order.vendorId,
        title: "Order Status Updated",
        message: `Status of order #${order.orderId} has been updated from ${existingOrder.status} to ${order.status}`,
        isRead: false,
      });
      return h.response({
        statusCode: 200,
        message: 'Order updated successfully',
        data: order
      }).code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  //GET VENDOR DASHBOARD
  static async getVendorDashboard(request, h) {
    try {
      console.log("I AM WITHIN VENDOR DASHBOARD")
      const userId = request.auth.credentials.userId;
    
      const vendor = await vendorServices.getVendor(userId);
     
      if (!vendor) {
        return h
          .response({
            statusCode: 404,
            message: "Vendor not found",
          })
          .code(404);
      }

      const dashboard = await ordersServices.getVendorDashboard(
        vendor._id,
        vendor.commissionRate,
      );

      return h
        .response({
          statusCode: 200,
          message: "Dashboard data fetched successfully",
          data: dashboard,
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }
}

module.exports = OrdersController;
