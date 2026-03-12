
const ErrorHandler = require('../lib/utils/ErrorHandler');
const VendorServices = require('../services/Vendor');
const UserServices = require('../services/User');
const vendorServices = new VendorServices();
const userServices = new UserServices();

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


      const existingUser = await userServices.login(request.payload.email);
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
      console.log("the reuslt within in the fetch by id is")
      console.log(result)

      return h.response({
        statusCode: 200,
        message: 'Vendor fetched successfully',
        data: result,
      }).code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

//UPDATE COMMISION
  static async updateCommission(request, h) {
    try {
      const result = await vendorServices.updateCommission(
        request.params.id,
        request.payload.commissionRate
      );
      return h.response({
        statusCode: 200,
        message: 'Commission updated successfully',
        data: result,
      }).code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

//UPDATE STATUS
  static async updateStatus(request, h) {
    try {
      const result = await vendorServices.updateStatus(
        request.params.id,
        request.payload.status
      );
      return h.response({
        statusCode: 200,
        message: `Vendor status updated to ${request.payload.status}`,
        data: result,
      }).code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
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

      const vendor= await vendorServices.getVendorAndUpdate(userId,request.payload)
      return h.response({
        statusCode: 200,
        data: vendor.theme
      }).code(200);

    } catch (error) {
      return h.response({ message: "Theme update failed" }).code(500);
    }
  };
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
  
}

module.exports = VendorController;