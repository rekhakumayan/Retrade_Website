const Order = require("../models/order");
const Product = require("../models/product");

class DashboardService {

  async getDashboardData(vendorId) {

    const sales = await Order.aggregate([
      {
        $match: {
          partnerId: vendorId,
          status: "active"
        }
      },
      {
        $group: {
          _id: null,
          grossSales: { $sum: "$price" },
          commission: { $sum: "$commissionAmount" }
        }
      }
    ]);

    const grossSales = sales[0]?.grossSales || 0;
    const commission = sales[0]?.commission || 0;
    const netEarnings = grossSales - commission;

    const totalProducts = await Product.countDocuments({
      vendorId: vendorId
    });

    const lowStockProducts = await Product.find({
      vendorId: vendorId,
      stock: { $lte: 5 }
    }).select("name stock");

    const monthlySales = await Order.aggregate([
      {
        $match: {
          partnerId: vendorId,
          status: "active"
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$price" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const months = [
      "JAN","FEB","MAR","APR","MAY","JUN",
      "JUL","AUG","SEP","OCT","NOV","DEC"
    ];

    const revenue = monthlySales.map((item) => ({
      name: months[item._id - 1],
      value: item.total
    }));

    return {
      grossSales,
      commission,
      netEarnings,
      totalProducts,
      lowStockProducts,
      revenue
    };
  }

}

module.exports = new DashboardService();