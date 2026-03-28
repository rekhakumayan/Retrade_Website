const mongoose = require("mongoose");
const OrdersSchema = require('../models/Orders');
const ProductSchema = require('../models/product')
const ErrorHandler = require('../lib/utils/ErrorHandler');

class OrdersServices {

  // FETCH PRODUCT BY ID's
  async getProductsByIds(productIds) {
    try {
      const products = await ProductSchema.find({ _id: { $in: productIds } });
      return products;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async createOrder(payload) {
    try {
      const order = await OrdersSchema.create(payload);
      return order;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async getOrders(where, options) {
    try {
      const match = { ...where };

      const search = match.search;
      delete match.search;

      if (search) {
        const users = await UserSchema.find({
          name: { $regex: search, $options: "i" },
        }).select("_id");

        const userIds = users.map((u) => u._id);
        match.$or = [
          { orderId: { $regex: search, $options: "i" } },
          { userId: { $in: userIds } },
        ];
      }

      if (match.date) {
        const date = new Date(match.date);

        const start = new Date(date.getFullYear(), date.getMonth(), 1);

        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);

        match.createdAt = {
          $gte: start,
          $lte: end,
        };

        delete match.date;
      }

      options.page = options.page || 1;
      options.limit = options.limit || 5;
      options.populate = [
        {
          path: "userId",
          select: "name",
        },
        {
          path: "items.productId",
          select: "name",
        },
      ];

      const orders = await OrdersSchema.paginate(match, options)

      return orders;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async getOrderById(orderId) {
    try {
      return await OrdersSchema.findOne({ orderId })
        .populate({
          path: "items.productId",
          select: "name image price", 
        })
        .lean();
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  // UPDATE ORDER

  async updateOrder(orderId, updateData) {
    try {
      const existingOrder = await OrdersSchema.findOne({ orderId });

      if (!existingOrder) return null;

      // duplicate status check
      if (updateData.status) {
        const alreadyExists = existingOrder.tracking.some(
          (item) => item.status === updateData.status,
        );

        if (alreadyExists) {
          throw new Error("Status already exists");
        }
      }

      const updateQuery = { $set: updateData };

      // kritika
      if (updateData.status) {
        updateQuery.$push = {
          tracking: {
            status: updateData.status,
            addedAt: Date.now(),
          },
        };
      }

      const order = await OrdersSchema.findOneAndUpdate(
        { orderId },
        updateQuery,
        { new: true },
      );

      return order;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }


  // GET VENDOR DASHBOARD 
  async getVendorDashboard(vendorId, commissionRatePercent) {
    const match = { vendorId: new mongoose.Types.ObjectId(vendorId) };
    // const totalOrders = await OrdersSchema.countDocuments(match);

    const grossSalesData = await OrdersSchema.aggregate([
      { $match: { ...match, status: { $nin: ["pending", "cancelled"] } } },
      { $group: { _id: null, total: { $sum: "$priceDetails.totalAmount" } } },
    ]);
    const grossSales = grossSalesData[0]?.total || 0;
    const commissionDeducted = (grossSales * (commissionRatePercent / 100)).toFixed(2)
    const netEarnings = (grossSales - commissionDeducted).toFixed(2);

    const recentOrdersRaw = await OrdersSchema.find(match)
      .sort({ createdAt: -1 })
      .limit(5)
      .select("orderId status priceDetails.totalAmount createdAt userId")
      .populate({
        path: "userId",
        select: "name",
      })
      .lean();

    const recentOrders = recentOrdersRaw.map((order) => ({
      _id: order._id,
      orderId: order.orderId,
      customer: order.userId?.name || "Unknown Customer",
      priceDetails: order.priceDetails.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    }));

    const monthlySales = await OrdersSchema.aggregate([
      { $match: { ...match, status: { $nin: ["pending", "cancelled"] } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$priceDetails.totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const revenue = months.map((month, index) => {
      const monthData = monthlySales.find((item) => item._id === index + 1);
      return {
        name: month,
        value: monthData ? monthData.total : 0,
      };
    });

    const totalProducts = await ProductSchema.countDocuments({ vendorId });
    const lowStockProducts = await ProductSchema.find({
      vendorId,
      stock: { $lt: 5 },
    })
      .select("name stock")
      .sort({ stock: 1 })
      .limit(5);

    return {
      // totalOrders,
      grossSales:Number(grossSales.toFixed(2)),
      commissionDeducted,
      netEarnings,
      revenue,
      recentOrders,
      totalProducts,
      lowStockProducts,
    };
  }
}
module.exports = OrdersServices;
