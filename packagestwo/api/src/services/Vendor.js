const VendorSchema = require('../models/Vendor');
const Category = require("../models/category")
const Product = require("../models/product")
const ErrorHandler = require('../lib/utils/SendEmail');

class VendorServices {

  async save(request) {
    try {
      return await VendorSchema.create(request);
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async findExisting(email, businessName) {
    try {
      return await VendorSchema.findOne({
        $or: [{ email }, { businessName }],
      });
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async get(parsedQuery) {
    try {
      const { where = {}, options = {} } = parsedQuery;
      options.sort = { createdAt: -1 };
      return await VendorSchema.paginate(where, options);
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async getById(id) {
    try {
      const vendor = await VendorSchema.findById(id);
      if (!vendor) {
        return ErrorHandler.error(
          new Error('Vendor not found'),
          { msg: 'Vendor not found', code: 404 }
        );
      }
      return vendor;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updateCommission(id, commissionRate) {
    try {
      const vendor = await VendorSchema.findByIdAndUpdate(
        id,
        { commissionRate },
        {
          new: true,
          runValidators: true
        }
      );
      if (!vendor) {
        return ErrorHandler.error(
          new Error('Vendor not found'),
          { msg: 'Vendor not found', code: 404 }
        );
      }
      return vendor;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updateStatus(id, status) {
    try {
      const vendor = await VendorSchema.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true
        }
      );
      if (!vendor) {
        return ErrorHandler.error(
          new Error('Vendor not found'),
          { msg: 'Vendor not found', code: 404 }
        );
      }
      return vendor;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

 async getVendor(id) {
  try {
    return await VendorSchema.findOne({userId:id});
  } catch (err) {
    return ErrorHandler.error(err, { msg: err, code: 400 });
  }

}

  async getVendorAndUpdate(userId, payload) {
    try{
    return await VendorSchema.findOneAndUpdate(
      { userId },
      { $set: { theme: payload } },
      { new: true }
    )}
    catch (err) {
    return ErrorHandler.error(err, { msg: err, code: 400 });
  }
   
  }

  async getCount() {
    try {
      return await VendorSchema.aggregate([
        {
          $facet: {

            // Active Vendors
            activeVendors: [
              { $match: { status: 'active' } },
              { $count: 'count' }
            ],

            // Order Stats
            orderStats: [
              {
                $lookup: {
                  from: 'orders',
                  pipeline: [
                    {
                      $match: { status: { $ne: 'cancelled' } }
                    },
                    {
                      $lookup: {
                        from: 'vendors',
                        localField: 'vendorId',
                        foreignField: '_id',
                        as: 'vendor'
                      }
                    },
                    { $unwind: '$vendor' },
                    {
                      $group: {
                        _id: null,
                        activeOrders: { $sum: 1 },
                        grossVolume: { $sum: '$priceDetails.totalAmount' },
                        netCommission: {
                          $sum: {
                            $multiply: [
                              '$priceDetails.price',
                              { $divide: ['$vendor.commissionRate', 100] }
                            ]
                          }
                        }
                      }
                    }
                  ],
                  as: 'ordersData'
                }
              },
              { $unwind: { path: '$ordersData', preserveNullAndEmptyArrays: true } },
              { $replaceRoot: { newRoot: '$ordersData' } }
            ],

            // Top Performer
            topPerformer: [
              {
                $lookup: {
                  from: 'orders',
                  pipeline: [
                    {
                      $match: { status: { $ne: 'cancelled' } }
                    },
                    {
                      $group: {
                        _id: '$vendorId',
                        revenue: { $sum: '$priceDetails.totalAmount' }
                      }
                    },
                    { $sort: { revenue: -1 } },
                    { $limit: 1 },
                    {
                      $lookup: {
                        from: 'vendors',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'vendor'
                      }
                    },
                    { $unwind: '$vendor' },
                    {
                      $project: {
                        vendorId: '$_id',
                        vendorName: '$vendor.businessName',
                        revenue: 1
                      }
                    }
                  ],
                  as: 'topVendor'
                }
              },
              { $unwind: { path: '$topVendor', preserveNullAndEmptyArrays: true } },
              { $replaceRoot: { newRoot: '$topVendor' } }
            ],

            // Revenue Chart
            revenueChart: [
              {
                $lookup: {
                  from: 'orders',
                  pipeline: [
                    { $match: { status: { $ne: 'cancelled' } } },
                    {
                      $group: {
                        _id: { $month: '$createdAt' },
                        value: { $sum: '$priceDetails.totalAmount' }
                      }
                    },
                    { $sort: { _id: 1 } },
                    {
                      $project: {
                        _id: 0,
                        name: {
                          $arrayElemAt: [
                            ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                            { $subtract: ['$_id', 1] }
                          ]
                        },
                        value: 1
                      }
                    }
                  ],
                  as: 'chartData'
                }
              },
              { $unwind: { path: '$chartData', preserveNullAndEmptyArrays: true } },
              { $replaceRoot: { newRoot: '$chartData' } }
            ]

          }
        },
        {
          $project: {
            activeVendors: { $arrayElemAt: ['$activeVendors.count', 0] },
            activeOrders: { $arrayElemAt: ['$orderStats.activeOrders', 0] },
            grossVolume: { $arrayElemAt: ['$orderStats.grossVolume', 0] },
            netCommission: { $arrayElemAt: ['$orderStats.netCommission', 0] },
            topPerformer: { $arrayElemAt: ['$topPerformer', 0] },
            revenueChart: '$revenueChart'
          }
        }
      ]);
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }
  // GET CATEGORIS 
  async getCategories(where, options) {

    const aggregate = Category.aggregate([
      { $match: where },
      {
        $sort: { createdAt: -1 }   // newest first
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categories",
          as: "products"
        }
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendors"
        }
      },
      {
        $unwind: {
          path: "$vendors",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          productCount: { $size: "$products" },
          productNames: {
            $map: {
              input: { $slice: ["$products", 3] },
              as: "p",
              in: "$$p.name"
            }
          }
        }
      },
      {
        $project: {
          products: 0,

        }
      },
    ]);
    return await Category.aggregatePaginate(aggregate, options)
  }

  //GET PRODUCTS 
  async getProducts(where = {}, options = {}) {

    const match = { ...where };
    if (match.search) {
      match.name = {
        $regex: match.search,
        $options: "i"
      };
      delete match.search;
    }
    const aggregate = Product.aggregate([

      { $match: match },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories"
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          stock: 1,
          status: 1,
          createdAt: 1,
          price: 1,
          categories: 1,
          image: 1,
        }
      }

    ]);
    const result = await Product.aggregatePaginate(aggregate, options);
    return result;
  }

  async getSalesTable(month, year, options = {}) {
  try {

    let startDate = null;
    let endDate = null;

    if (month && year) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0, 23, 59, 59);
    }

    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;

    // 🔹 FULL DATA (for total count)
    const fullData = await VendorSchema.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'vendorId',
          as: 'orders'
        }
      },
      {
        $unwind: {
          path: '$orders',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          $or: [
            {
              'orders.status': { $ne: 'cancelled' },
              ...(startDate && endDate
                ? {
                    'orders.createdAt': {
                      $gte: startDate,
                      $lte: endDate
                    }
                  }
                : {})
            },
            { orders: { $eq: null } }
          ]
        }
      },
      {
        $group: {
          _id: '$_id',

          vendorName: { $first: '$contactName' },
          vendorShop: { $first: '$businessName' },
          email: { $first: '$email' },
          commissionRate: { $first: '$commissionRate' },
          status: { $first: '$status' },

          price: { $sum: '$orders.priceDetails.price' },
          gst: { $sum: '$orders.priceDetails.gst' },
          coupon: { $sum: '$orders.priceDetails.coupon' },
          deliveryCharges: { $sum: '$orders.priceDetails.deliveryCharges' },
          extraCharges: { $sum: '$orders.priceDetails.extraCharges' },

          totalAmount: {
            $sum: '$orders.priceDetails.totalAmount'
          },

          orders: {
            $sum: {
              $cond: [{ $ifNull: ['$orders._id', false] }, 1, 0]
            }
          },

          earnedCommission: {
            $sum: {
              $multiply: [
                '$orders.priceDetails.price',
                { $divide: ['$commissionRate', 100] }
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          vendorId: '$_id',
          vendorName: 1,
          vendorShop: 1,
          email: 1,
          price: { $ifNull: ['$price', 0] },
          gst: { $ifNull: ['$gst', 0] },
          coupon: { $ifNull: ['$coupon', 0] },
          deliveryCharges: { $ifNull: ['$deliveryCharges', 0] },
          extraCharges: { $ifNull: ['$extraCharges', 0] },
          totalAmount: { $ifNull: ['$totalAmount', 0] },
          commissionRate: 1,
          earnedCommission: { $ifNull: ['$earnedCommission', 0] },
          orders: { $ifNull: ['$orders', 0] },
          status: 1
        }
      },
      {
        $sort: { totalAmount: -1 }
      }
    ]);

    // 🔹 PAGINATION APPLY
    const paginatedDocs = fullData.slice(skip, skip + limit);

    return {
      docs: paginatedDocs,
      totalDocs: fullData.length,
      page,
      limit,
      totalPages: Math.ceil(fullData.length / limit)
    };

  } catch (err) {
    return ErrorHandler.error(err, { msg: err, code: 400 });
  }
}
 
  async getCustomers(parsedQuery) {
    try {

      const { where = {}, options = {} } = parsedQuery;

      const query = {
        ...where,
        role: 'customer'
      };

      return await require('../models/User').paginate(query, options);

    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async getCustomerStats() {
    try {

      const UserSchema = require('../models/User');

      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

      const result = await UserSchema.aggregate([
        {
          $match: { role: 'customer' }
        },

        {
          $group: {
            _id: null,

            totalCustomers: { $sum: 1 },

            activeCustomers: {
              $sum: {
                $cond: [{ $eq: ['$status', 'active'] }, 1, 0]
              }
            },

            inactiveCustomers: {
              $sum: {
                $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0]
              }
            },

            newCustomersThisMonth: {
              $sum: {
                $cond: [
                  { $gte: ['$createdAt', startOfMonth] },
                  1,
                  0
                ]
              }
            }

          }
        },

        {
          $project: {
            _id: 0,
            totalCustomers: 1,
            activeCustomers: 1,
            inactiveCustomers: 1,
            newCustomersThisMonth: 1
          }
        }
      ]);

      return result[0] || {
        totalCustomers: 0,
        activeCustomers: 0,
        inactiveCustomers: 0,
        newCustomersThisMonth: 0
      };

    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async getCustomerById(id) {
    try {

      const UserSchema = require('../models/User');
      const OrdersSchema = require('../models/Orders');

      const customer = await UserSchema.findOne({
        _id: id,
        role: 'customer'
      });

      if (!customer) {
        return ErrorHandler.error(
          new Error('Customer not found'),
          { msg: 'Customer not found', code: 404 }
        );
      }

      const orders = await OrdersSchema.find({ userId: id })
        .populate({
          path: 'vendorId',
          select: 'contactName businessName'
        })
        .select('orderId status createdAt priceDetails.totalAmount vendorId')
        .sort({ createdAt: -1 });

      return {
        customer,
        orders
      };

    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updateCustomerStatus(id, status) {
    try {

      const UserSchema = require('../models/User');

      const customer = await UserSchema.findOneAndUpdate(
        { _id: id, role: 'customer' },
        { status },
        {
          new: true,
          runValidators: true
        }
      );

      if (!customer) {
        return ErrorHandler.error(
          new Error('Customer not found'),
          { msg: 'Customer not found', code: 404 }
        );
      }

      return customer;

    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

}

module.exports = VendorServices;