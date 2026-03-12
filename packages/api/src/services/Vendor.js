const VendorSchema = require('../models/Vendor');
const ErrorHandler = require('../lib/utils/ErrorHandler');

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

  async getVendor(userId) {
    return await VendorSchema.findOne({ userId });
  }

  async getVendorAndUpdate(userId,payload) {
    return await VendorSchema.findOneAndUpdate(
      { userId },
      { $set: { theme:payload } },
      { new: true }
    );
  }
  async getCount() {
    try {
      return await VendorSchema.aggregate([
        {
          $facet: {

            // Active Vendors Count
            activeVendors: [
              {
                $match: { status: 'active' }
              },
              {
                $count: 'count'
              }
            ],

            // Order Stats
            orderStats: [
              {
                $lookup: {
                  from: 'orders',
                  pipeline: [
                    {
                      $match: { status: 'active' }
                    },
                    {
                      $group: {
                        _id: null,
                        activeOrders: { $sum: 1 },
                        grossVolume: { $sum: '$price' },
                        netCommission: { $sum: '$commissionAmount' }
                      }
                    }
                  ],
                  as: 'ordersData'
                }
              },
              {
                $unwind: {
                  path: '$ordersData',
                  preserveNullAndEmptyArrays: true
                }
              },

              {
                $replaceRoot: { newRoot: '$ordersData' }
              }
            ],

            // top performer

            topPerformer: [
              {
                $lookup: {
                  from: 'orders',
                  pipeline: [
                    {
                      $match: { status: { $in: ['active', 'completed'] } }
                    },
                    {
                      $group: {
                        _id: '$vendorId',
                        revenue: { $sum: '$price' },
                        vendorName: { $first: '$vendorShopName' }
                      }
                    },
                    {
                      $sort: { revenue: -1 }
                    },
                    {
                      $limit: 1
                    }
                  ],
                  as: 'topVendor'
                }
              },

              {
                $unwind: {
                  path: '$topVendor',
                  preserveNullAndEmptyArrays: true
                }
              },

              {
                $project: {
                  vendorId: '$topVendor._id',
                  vendorName: '$topVendor.vendorName',
                  revenue: '$topVendor.revenue'
                }
              }
            ],

            // Revenue Chart (Monthly Revenue)
            revenueChart: [
              {
                $lookup: {
                  from: 'orders',
                  pipeline: [
                    {
                      $match: { status: { $in: ['active', 'completed'] } }
                    },
                    {
                      $group: {
                        _id: { $month: { $toDate: '$createdAt' } },
                        value: { $sum: '$price' }
                      }
                    },
                    {
                      $sort: { _id: 1 }
                    },
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

              {
                $unwind: {
                  path: '$chartData',
                  preserveNullAndEmptyArrays: true
                }
              },

              {
                $replaceRoot: { newRoot: '$chartData' }
              },

              {
                $group: {
                  _id: '$name',
                  value: { $first: '$value' }
                }
              },

              {
                $project: {
                  _id: 0,
                  name: '$_id',
                  value: 1
                }
              }
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

}

module.exports = VendorServices;