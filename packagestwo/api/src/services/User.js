 const mongoose = require("mongoose");
const OrderSchema = require("../models/Orders");
const UserSchema = require("../models/User");
const ErrorHandler = require("../lib/utils/ErrorHandler");
const crypto = require('crypto');

class UserServices {
  async signup(request) {
    try {
      return await UserSchema.create(request);
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async login(email) {
    const user = await UserSchema.findOne({email});
    console.log("USER FOUND:", user);
    return user;
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
        { new: true },
      );
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updatePassword(email, hashedPassword) {
    try {
      return await UserSchema.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
        { new: true },
      );
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async findCurrUser(id) {

    const user = await UserSchema.findById(id);
    return user;
  }

  // GET VENDOR CUSTOMERS:

  async getVendorCustomers(where, options) {
    try {
      const page = options.page || 1;
      const limit = options.limit || 5;
      const skip = (page - 1) * limit;

      const match = { ...where };

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

      const search = match.search;
      delete match.search;

      const pipeline = [
        {
          $match: match,
        },

        {
          $group: {
            _id: "$userId",

            orders: { $sum: 1 },

            grossSpend: { $sum: "$priceDetails.totalAmount" },

          phone: { $first: "$address.phone" },
          
          firstSeen:{$min:"$createdAt"},
          ordersList: {
            $push: {
              orderId: "$orderId",
              date: "$createdAt",
              status: "$status",
              totalAmount: "$priceDetails.totalAmount"
            }
          }
        }
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      {
        $unwind: "$user"
      },

      ...(search ? [{
        $match: {
          $or: [
            { "user.name": { $regex: search, $options: "i" } },
            { "user.email": { $regex: search, $options: "i" } }
          ]
        }
      }] : []),

      {
        $project: {
          _id: 0,
          customerId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          phone: 1,
          registrationDate: "$user.createdAt",
          orders: 1,
          grossSpend: 1,
          ordersList: 1,
          firstSeen:1
        }
      },

        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },

        {
          $unwind: "$user",
        },

        ...(search
          ? [
              {
                $match: {
                  $or: [
                    { "user.name": { $regex: search, $options: "i" } },
                    { "user.email": { $regex: search, $options: "i" } },
                  ],
                },
              },
            ]
          : []),

        {
          $project: {
            _id: 0,
            customerId: "$user._id",
            name: "$user.name",
            email: "$user.email",
            phone: 1,
            registrationDate: "$user.createdAt",
            orders: 1,
            grossSpend: 1,
            ordersList: 1,
          },
        },

        { $sort: { grossSpend: -1 } },

        { $skip: skip },

        { $limit: limit },
      ];

      const result = await OrderSchema.aggregate(pipeline);

      return result;
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }
  async findById(userId) {
    try {
      return await UserSchema.findById(userId).select("-password");
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updateName(userId, name) {
    try {
      return await UserSchema.findByIdAndUpdate(
        userId,
        { name },
        { new: true },
      ).select("-password");
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async addAddress(userId, addressData) {
    try {
      // ADD: fetch current count first
      const user = await UserSchema.findById(userId).select("addresses");
      if (user.addresses.length >= 4) {
        const err = new Error("You can only add up to 4 addresses.");
        err.statusCode = 400;
        throw err;
      }

      return await UserSchema.findByIdAndUpdate(
        userId,
        { $push: { addresses: addressData } },
        { new: true },
      ).select("-password");
    } catch (err) {
      return ErrorHandler.error(err, {
        msg: err.message || err,
        code: err.statusCode || 400,
      });
    }
  }

  async updateAddress(userId, addressId, addressData) {
    try {
      const allowedFields = [
        "tag",
        "houseNo",
        "street",
        "city",
        "pincode",
        "country",
      ];
      const updateFields = {};
      allowedFields.forEach((field) => {
        if (addressData[field] !== undefined) {
          updateFields[`addresses.$.${field}`] = addressData[field];
        }
      });
      return await UserSchema.findOneAndUpdate(
        { _id: userId, "addresses._id": addressId },
        { $set: updateFields },
        { new: true },
      ).select("-password");
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async deleteAddress(userId, addressId) {
    try {
      return await UserSchema.findByIdAndUpdate(
        userId,
        { $pull: { addresses: { _id: addressId } } },
        { new: true },
      ).select("-password");
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async setDefaultAddress(userId, addressId) {
    try {
      await UserSchema.findByIdAndUpdate(userId, {
        $set: { "addresses.$[].isDefault": false },
      });

      return await UserSchema.findOneAndUpdate(
        { _id: userId, "addresses._id": addressId },
        { $set: { "addresses.$.isDefault": true } },
        { new: true },
      ).select("-password");
    } catch (err) {
      return ErrorHandler.error(err, { msg: err, code: 400 });
    }
  }

  async updateStatusById(userId, status) {
  try {
    const User = require('../models/User');

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;

  } catch (err) {
    throw err;
  }
  }

 generateResetToken(userId) {

  const token = crypto.randomBytes(32).toString('hex');

  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  return {
    token,
    expiry,
  };
}

async findByResetToken(token) {
  return await UserSchema.findOne({ resetToken: token });
}

async updateResetToken(email, token, expiry) {
  const user = await UserSchema.findOneAndUpdate(
    { email },
    {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
    { new: true }
  );

  return user;
}

async findByEmail(email) {
  return await UserSchema.findOne({ email });
}

async updatePasswordById(userId, hashedPassword) {
  return await UserSchema.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
    { new: true }
  );
}

async updateResetTokenById(userId, token, expiry) {
  return await UserSchema.findByIdAndUpdate(
    userId,
    {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
    { new: true }
  );
}

  async updateUser(userId, data) {
  try {
    return await UserSchema.findByIdAndUpdate(
      userId,
      data,
      { new: true }
    ).select("-password");
  } catch (err) {
    return ErrorHandler.error(err, { msg: err, code: 400 });
  }
}
  async updateStatusById(userId, status) {
  try {
    const User = require('../models/User');

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;

  } catch (err) {
    throw err;
  }
  }

 generateResetToken(userId) {

  const token = crypto.randomBytes(32).toString('hex');

  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  return {
    token,
    expiry,
  };
}

async findByResetToken(token) {
  return await UserSchema.findOne({ resetToken: token });
}

async updateResetToken(email, token, expiry) {
  const user = await UserSchema.findOneAndUpdate(
    { email },
    {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
    { new: true }
  );

  return user;
}

async findByEmail(email) {
  return await UserSchema.findOne({ email });
}

async updatePasswordById(userId, hashedPassword) {
  return await UserSchema.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
    { new: true }
  );
}

async updateResetTokenById(userId, token, expiry) {
  return await UserSchema.findByIdAndUpdate(
    userId,
    {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
    { new: true }
  );
}

}
module.exports = UserServices;