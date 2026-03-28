
const ErrorHandler = require('../lib/utils/ErrorHandler');
const VendorServices = require('../services/Vendor');
const UserServices = require('../services/User');
const ExcelJS = require('exceljs');
const vendorServices = new VendorServices();
const userServices = new UserServices();
const sendEmail = require('../lib/utils/SendEmail');
class VendorController {
  //SAVE
  static async save(request, h) {
    try {

      const existing = await vendorServices.findExisting(
        request.payload.email,
        request.payload.businessName
      );

      if (existing) {
        const field = existing.email === request.payload.email ? 'email' : 'business name';
        return h.response({
          statusCode: 409,
          message: `A vendor with this ${field} already exists`,
        }).code(409);
      }


      const existingUser = await userServices.findByEmail(request.payload.email);
      let vendorUserId;

      if (existingUser) {

        const updatedUser = await userServices.updateRole(
          request.payload.email,
          'partner'
        );
        vendorUserId = updatedUser._id;
      } else {

        const newUser = await userServices.createVendorUser({
          name: request.payload.contactName,
          email: request.payload.email,
          role: 'partner',
          status: 'active',

        });
        vendorUserId = newUser._id;
      }

      const result = await vendorServices.save({
        userId: vendorUserId,
        contactName: request.payload.contactName,
        businessName: request.payload.businessName,
        email: request.payload.email,
        commissionRate: request.payload.commissionRate,
      });


      // ✅ ADD THIS BLOCK [1803]


      try {
        if (!existingUser) {

          const { token, expiry } = userServices.generateResetToken(vendorUserId);
          console.log("TOKEN:", token);
          console.log("EMAIL:", request.payload.email);
          await userServices.updateResetToken(request.payload.email, token, expiry);

          await sendEmail({
            to: request.payload.email,
            subject: 'Welcome to Platform',
            html: `
        <h3>Welcome ${request.payload.contactName}</h3>
        <p>Your partner account has been created.</p>
        <p>Please set your password using the link below:</p>
        <a href="${process.env.APP_BASE_URL}/set-password?token=${token}">
          Set Password
        </a>
      `,
          });
        } else {
          await sendEmail({
            to: request.payload.email,
            subject: 'Partner Role Activated',
            html: `
        <p>You are now registered as a partner/vendor on MarketNest.</p>
      `,
          });
        }
      } catch (emailError) {
      }
      return h.response({
        statusCode: 201,
        message: 'Vendor onboarded successfully. Login credentials sent to vendor email.',
        data: result,
      }).code(201);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  //FETCH
  static async fetch(request, h) {
    try {

      const parsedQuery = request.parsedQuery || { where: {}, options: {} };

      const result = await vendorServices.get(parsedQuery);
      return h.response({
        statusCode: 200,
        message: 'Vendors fetched successfully',
        data: result,
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  //FETCH BY ID
  static async fetchById(request, h) {
    try {
      const result = await vendorServices.getVendor(request.params.id);

      return h.response({
        statusCode: 200,
        message: 'Vendor fetched successfully',
        data: result,
      }).code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  // update commsions

  static async updateCommission(request, h) {
    try {

      const { commissionRate } = request.payload;

      if (commissionRate === undefined) {
        return h.response({
          statusCode: 400,
          message: 'Commission rate is required'
        }).code(400);
      }

      // ✅ ADD: get old data
      const oldVendor = await vendorServices.getVendor(request.params.id);

      const result = await vendorServices.updateCommission(
        request.params.id,
        commissionRate
      );

      // ✅ ADD: send email only if changed
      if (oldVendor.commissionRate !== request.payload.commissionRate) {
        await sendEmail({
          to: oldVendor.email,
          subject: 'Commission Updated',
          html: `
          <p>Your commission has been updated.</p>
          <p>Old: ${oldVendor.commissionRate}%</p>
          <p>New: ${request.payload.commissionRate}%</p>
        `,
        });
      }

      return h.response({
        statusCode: 200,
        message: 'Commission updated successfully',
        data: result,
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }
  
  // update status

  static async updateStatus(request, h) {
    try {

      const { status } = request.payload;

        if (!['active', 'inactive'].includes(status)) {
      return h.response({
        statusCode: 400,
        message: 'Invalid status'
      }).code(400);
    }

      const vendor = await vendorServices.getVendor(request.params.id);

      const result = await vendorServices.updateStatus(
        request.params.id,
        status
      );

      // ✅ SYNC users
      await userServices.updateStatusById(
        vendor.userId,
        request.payload.status === 'active' ? 'active' : 'inactive'
      );

      // ✅ EMAIL
      if (vendor.status !== request.payload.status) {
        await sendEmail({
          to: vendor.email,
          subject: 'Account Status Updated',
          html: `
          <p>Your account status has been changed.</p>
          <p>New Status: ${request.payload.status}</p>
        `,
        });
      }

      return h.response({
        statusCode: 200,
        message: `Vendor status updated to ${status}`,
        data: result,
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  //GET VENDOR CATEGORIES
  static async getCategories(request, h) {
    try {
      let { where = {}, options } = request.parsedQuery;
      const userId = request.auth?.credentials.userId;

      const vendor = await vendorServices.getVendor(userId);

      if (!vendor) {
        return h.response({
          statusCode: 404,
          message: "Vendor not found"
        }).code(404);
      }
      where.vendorId = vendor._id;

      const result = await vendorServices.getCategories(where, options);

      return h.response({
        statusCode: 200,
        message: "Categories fetched successfully",
        data: result
      }).code(200);

    } catch (err) {
      return ErrorHandler.error(err, {
        msg: "Fetch failed",
        code: 500
      });
    }
  }

  //GET VENDOR CATEGORIES
  static async getProducts(request, h) {
    try {
      let { where = {}, options } = request.parsedQuery;
      const userId = request.auth?.credentials.userId;

      const vendor = await vendorServices.getVendor(userId);

      if (!vendor) {
        return h.response({
          statusCode: 404,
          message: "Vendor not found"
        }).code(404);
      }
      where.vendorId = vendor._id;

      const result = await vendorServices.getProducts(where, options);

      return h.response({
        statusCode: 200,
        message: "Products fetched successfully",
        data: result
      }).code(200);

    } catch (err) {
      return ErrorHandler.error(err, {
        msg: "Fetch failed",
        code: 500
      });
    }
  }

  //GET VENDOR THEME
  static async getVendorTheme(request, h) {
    try {

      const userId = request.params.userId;
      const vendor = await vendorServices.getVendor(userId)

      if (!vendor) {
        return h.response({ message: "Vendor not found" }).code(404);
      }
      return h.response(vendor.theme).code(200);

    } catch (error) {
      return h.response({ message: "Failed to fetch theme" }).code(500);
    }
  }

  //UPDATE VENDOR THEME
  static async updateVendorTheme(request, h) {
    try {

      const userId = request.auth.credentials.userId;

      const vendor = await vendorServices.getVendorAndUpdate(userId, request.payload)
      return h.response({
        statusCode: 200,
        data: vendor.theme
      }).code(200);

    } catch (error) {
      return h.response({ message: "Theme update failed" }).code(500);
    }
  };
  // GET DASHBOARD COUNT
  static async dashboardCount(request, h) {
    try {
      const result = await vendorServices.getCount();
      return h.response({
        statusCode: 200,
        message: 'Vendors and order count fetched successfully',
        data: result,
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  // sales table

  static async getSalesTable(request, h) {
    try {

      const { month, year, page = 1, limit = 10 } = request.query;

      const result = await vendorServices.getSalesTable(month, year, {page, limit});

      return h.response({
        statusCode: 200,
        message: 'Sales table data fetched successfully',
        data: result
      });

    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  static async exportSalesReport(request, h) {
    try {

      const { month, year } = request.query;

      const result = await vendorServices.getSalesTable(month, year);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sales Report');

      worksheet.columns = [
        { header: 'Vendor Id', key: 'vendorId', width: 30 },
        { header: 'Vendor Name', key: 'vendorName', width: 25 },
        { header: 'Vendor Shop', key: 'vendorShop', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Price', key: 'price', width: 15 },
        { header: 'GST', key: 'gst', width: 12 },
        { header: 'Coupon', key: 'coupon', width: 12 },
        { header: 'Delivery Charge', key: 'deliveryCharge', width: 18 },
        { header: 'Extra Charges', key: 'extraCharges', width: 18 },
        { header: 'Total Amount', key: 'totalAmount', width: 18 },
        { header: 'Commission Rate', key: 'commissionRate', width: 18 },
        { header: 'Earned Commission', key: 'earnedCommission', width: 20 },
        { header: 'Orders', key: 'orders', width: 12 },
        { header: 'Status', key: 'status', width: 12 }
      ];

      worksheet.getRow(1).font = { bold: true };

      result.forEach(row => {
        worksheet.addRow({
          vendorId: row.vendorId,
          vendorName: row.vendorName,
          vendorShop: row.vendorShop,
          email: row.email,
          price: row.price,
          gst: row.gst,
          coupon: row.coupon,
          deliveryCharge: row.deliveryCharge,
          extraCharges: row.extraCharges,
          totalAmount: row.totalAmount,
          commissionRate: row.commissionRate,
          earnedCommission: row.earnedCommission,
          orders: row.orders,
          status: row.status
        });
      });

      const totals = {
        price: 0,
        gst: 0,
        totalAmount: 0,
        earnedCommission: 0,
        orders: 0
      };

      result.forEach(r => {
        totals.price += r.price || 0;
        totals.gst += r.gst || 0;
        totals.totalAmount += r.totalAmount || 0;
        totals.earnedCommission += r.earnedCommission || 0;
        totals.orders += r.orders || 0;
      });

      const totalRow = worksheet.addRow({
        vendorId: 'TOTAL',
        price: totals.price,
        gst: totals.gst,
        totalAmount: totals.totalAmount,
        earnedCommission: totals.earnedCommission,
        orders: totals.orders
      });

      totalRow.font = { bold: true };

      const buffer = await workbook.xlsx.writeBuffer();

      return h
        .response(buffer)
        .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .header(
          'Content-Disposition',
          `attachment; filename="sales-report-${month}-${year}.xlsx"`
        );

    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  // FETCH CUSTOMERS
  static async getCustomers(request, h) {
    try {

      const parsedQuery = request.parsedQuery || { where: {}, options: {} };

      const result = await vendorServices.getCustomers(parsedQuery);

      return h.response({
        statusCode: 200,
        message: 'Customers fetched successfully',
        data: result,
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async getCustomerStats(request, h) {
    try {

      const result = await vendorServices.getCustomerStats();

      return h.response({
        statusCode: 200,
        message: 'Customer stats fetched successfully',
        data: result,
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async getCustomerById(request, h) {
    try {

      const result = await vendorServices.getCustomerById(request.params.id);

      return h.response({
        statusCode: 200,
        message: 'Customer fetched successfully',
        data: result,
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async updateCustomerStatus(request, h) {
    try {

      const result = await vendorServices.updateCustomerStatus(
        request.params.id,
        request.payload.status
      );

      return h.response({
        statusCode: 200,
        message: `Customer status updated to ${request.payload.status}`,
        data: result,
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

}


module.exports = VendorController;