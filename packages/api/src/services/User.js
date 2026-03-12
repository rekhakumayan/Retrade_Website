const UserSchema = require('../models/User');
const ErrorHandler = require('../lib/utils/ErrorHandler');

class UserServices {

  async signup(request) {
    try {
      return await UserSchema.create(request);
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async login(email) {
    try {
      return await UserSchema.findOne({ email });
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }
  async findAllUsers() {
    try {
      console.log("==========================FIND ALL USERS")
      return await UserSchema.find({});
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async createVendorUser(request) {
    try {
      return await UserSchema.create(request);
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updateRole(email, role) {
    try {
      return await UserSchema.findOneAndUpdate(
        { email },
        { role },
        { new: true }
      );
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  // async saveResetToken(email, resetToken) {
  //   try {
  //     return await UserSchema.findOneAndUpdate(
  //       { email },
  //       {
  //         resetToken,
  //         resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  //       },
  //       { new: true }
  //     );
  //   } catch (err) {
  //     return ErrorHandler.error(err, { msg: err, code: 400 });
  //   }
  // }


  // async findByResetToken(token) {
  //   try {
  //     return await UserSchema.findOne({
  //       resetToken: token,
  //       resetTokenExpiry: { $gt: new Date() },
  //     });
  //   } catch (err) {
  //     return ErrorHandler.error(err, { msg: err, code: 400 });
  //   }
  // }

  async updatePassword(email, hashedPassword) {
    try {
      return await UserSchema.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
        { new: true }
      );
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async findCurrUser(id) {
    console.log("Fetching user with ID:", id);
    const user = await UserSchema.findById(id);
    console.log("====================================User fetched:", user);
    return user;
  }
}

module.exports = UserServices;