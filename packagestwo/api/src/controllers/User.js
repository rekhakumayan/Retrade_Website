const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../lib/utils/ErrorHandler");
const UserServices = require("../services/User");
const Vendor = require("../models/Vendor");
const sendEmail = require('../lib/utils/SendEmail');

const userServices = new UserServices();

class UserController {
  //SIGN UP
  static async signup(request, h) {
    try {
      const payload = request.payload;
      const isUserAlreadyExists = await userServices.login(payload.email);
      if (isUserAlreadyExists) {
        return h
          .response({
            statusCode: 409,
            message: "Email already exists",
          })
          .code(409);
      }

      const hashedPassword = await bcrypt.hash(request.payload.password, 10);
      payload.password = hashedPassword;
      payload.vendorId = payload.allowedVendors || [];
      delete payload.allowedVendors;
      const newUser = await userServices.signup(payload);

      return h
        .response({
          statusCode: 201,
          message: "User registered successfully",
          data: {
            userId: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: newUser.status,
            createdAt: newUser.createdAt,
          },
        })
        .code(201);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async login(request, h) {
  try {
    const { email, password, vendorId } = request.payload;
    const { platform } = request.query;

    const user = await userServices.login(email);
    if (!user) {
      return h.response({
        statusCode: 404,
        message: "Invalid email or password",
      }).code(404);
    }

    // ✅ Vendor check ONLY for vendorapp
    if (platform === 'vendorapp') {
      if (!vendorId) {
        return h.response({
          statusCode: 400,
          message: "Vendor required"
        }).code(400);
      }

      const hasVendor = user.vendorId?.some(
        (v) => v.toString() === vendorId
      );

      if (!hasVendor) {
        return h.response({
          statusCode: 403,
          message: "User not assigned to this vendor"
        }).code(403);
      }
    }

    if (user.status !== "active") {
      return h.response({
        statusCode: 403,
        message: "Your account has been deactivated",
      }).code(403);
    }

    if (user.password === null) {
      return h.response({
        statusCode: 200,
        message: "first_login",
        data: {
          email: user.email,
          mustSetPassword: true,
        },
      }).code(200);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return h.response({
        statusCode: 401,
        message: "Invalid email or password",
      }).code(401);
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        iat: Date.now(),
        platform,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return h.response({
      statusCode: 200,
      message: "Login successful",
      data: {
        token,
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      },
    }).code(200);

  } catch (error) {
    return ErrorHandler.error(error, { msg: error, code: 400 });
  }
}

  // SET PASSWORD
    static async setPassword(request, h) {
  try {
    const { token, password } = request.payload;

    const user = await userServices.findByResetToken(token);

    if (!user) {
      return h.response({
        statusCode: 400,
        message: "Invalid or expired token",
      }).code(400);
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return h.response({
        statusCode: 400,
        message: "Token expired",
      }).code(400);
    }

    if (user.password !== null) {
      return h.response({
        statusCode: 400,
        message: "Password already set. Please login normally.",
      }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userServices.updatePasswordById(user._id, hashedPassword);

    return h.response({
      statusCode: 200,
      message: "Password set successfully. You can now login.",
    }).code(200);

  } catch (error) {
    return ErrorHandler.error(error, { msg: error, code: 400 });
  }
}

  // forget password [reset password]- 1803 ] 
  static async forgotPassword(request, h) {
  try {

    const user = await userServices.findByEmail(request.payload.email);

    if (!user) {
      return h.response({
        statusCode: 404,
        message: 'User not found',
      }).code(404);
    }

    const { token, expiry } = userServices.generateResetToken(user._id);

    await userServices.updateResetTokenById(user._id, token, expiry);

    await sendEmail({
      to: user.email,
      subject: 'Reset Password',
      html: `
        <p>Click below to reset your password:</p>
        <a href="${process.env.APP_BASE_URL}/set-password?token=${token}">
          Reset Password
        </a>
      `,
    });

    return h.response({
      statusCode: 200,
      message: 'Password reset link sent to email',
    }).code(200);

  } catch (error) {
    return ErrorHandler.error(error, { msg: error, code: 400 });
  }
}

  static async getUser(request, h) {
    try {
      const tokenUserId = request.auth.credentials.userId.toString();
      const { userId } = request.params;

      if (tokenUserId !== userId) {
        return h
          .response({ statusCode: 403, message: "Access denied" })
          .code(403);
      }

      const user = await userServices.findById(userId);
      if (!user) {
        return h
          .response({ statusCode: 404, message: "User not found" })
          .code(404);
      }

      return h
        .response({
          statusCode: 200,
          data: {
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            addresses: user.addresses,
            createdAt: user.createdAt,
          },
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  static async updateUser(request, h) {
    try {
      const tokenUserId = request.auth.credentials.userId.toString();
      const { userId } = request.params;
      if (tokenUserId !== userId) {
        return h
          .response({ statusCode: 403, message: "Access denied" })
          .code(403);
      }
      const { name, addressAction, avatar } = request.payload;
      if (name) {
        const updated = await userServices.updateName(userId, name);
        if (!updated) {
          return h
            .response({ statusCode: 404, message: "User not found" })
            .code(404);
        }
      }

      // if (avatar && avatar.path) {
      //   console.log("Uploading file:", avatar.path);
      //   const cloudinary = require("../config/cloudinary");

      //   const result = await cloudinary.uploader.upload(avatar.path);

      //   await userServices.updateUser(userId, {
      //     avatar: result.secure_url,
      //   });
      // }

      if (addressAction) {
        const {
          addressId,
          data,
          delete: shouldDelete,
          isDefault,
        } = addressAction;
        if (!addressId) {
          const result = await userServices.addAddress(userId, data);
          if (!result || result.isBoom) {
            return h
              .response({
                statusCode: 400,
                message: "You can only add up to 4 addresses.",
              })
              .code(400);
          }
        } else if (shouldDelete) {
          await userServices.deleteAddress(userId, addressId);
        } else if (isDefault) {
          await userServices.setDefaultAddress(userId, addressId);
        } else if (data) {
          await userServices.updateAddress(userId, addressId, data);
        }
      }
      const updatedUser = await userServices.findById(userId);
      return h
        .response({
          statusCode: 200,
          message: "User details updated successfully",
          data: {
            userId: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status,
            addresses: updatedUser.addresses,
            avatar: updatedUser.avatar,
          },
        })
        .code(200);
    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }


  ////////////
  static async updateAvatar(request, h) {
  try {
    const tokenUserId = request.auth.credentials.userId.toString();
    const { userId } = request.params;

    if (tokenUserId !== userId) {
      return h.response({ message: "Access denied" }).code(403);
    }

    const avatar = request.payload.avatar;

    if (!avatar || !avatar.path) {
      return h.response({ message: "No file uploaded" }).code(400);
    }

    const cloudinary = require("../config/cloudinary");

    const result = await cloudinary.uploader.upload(avatar.path);

    const updatedUser = await userServices.updateUser(userId, {
      avatar: result.secure_url,
    });

    return h.response({
      statusCode: 200,
      message: "Avatar updated successfully",
      data: {
        avatar: updatedUser.avatar,
      },
    });

  } catch (error) {
    return ErrorHandler.error(error, { msg: error, code: 400 });
  }
}

  // FETCH CUSTOMERS
  static async fetchCustomers(request, h) {
    try {
      const userId = request.auth.credentials.userId;
      console.log("====================== USER ID ")
      console.log(userId)
      const vendor = await Vendor.findOne({ userId });
      console.log("============================ VENDOR IS ")
      console.log(vendor)
      if (!vendor) {
        return h
          .response({
            statusCode: 404,
            message: "Vendor not found for this partner",
          })
          .code(404);
      }

      const vendorId = vendor._id;

      let { where, options } = request.parsedQuery;

      where = where || {};
      options = options || {};
      where.vendorId = vendorId;
      where.search = request.query.search || ""; //options

      if (request.query.date) {
        where.date = request.query.date;
      }

      const customers = await userServices.getVendorCustomers(where, options);
      return h
        .response({
          statusCode: 200,
          message: "Customers fetched successfully",
          data: customers,
        })
        .code(200);
    } catch (err) {
      return ErrorHandler.error(err, {
        msg: "Fetch failed",
        code: 500,
      });
    }
  }
}
module.exports = UserController;
