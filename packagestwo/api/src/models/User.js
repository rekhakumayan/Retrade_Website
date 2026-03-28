const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const addressSchema = new mongoose.Schema(
  {
    tag: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
    houseNo: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, match: /^\d{6}$/ },
    country: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: false,
      default: null,
    },

    resetToken: {
      type: String,
      default: null,
    },

    resetTokenExpiry: {
      type: Date,
      default: null,
    },

    role: {
      type: String,
      enum: ["admin", "partner", "customer"],
      default: "customer",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

     avatar: {
      type: String,
      default: "",
    },

    addresses: [addressSchema],

    vendorId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    ],
  },

  {
    timestamps: true,
  },
);

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
