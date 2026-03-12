const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    contactName: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },

    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },

    commissionRate: {
      type: Number,
      required: [true, 'Commission rate is required'],
      min: [0, 'Commission cannot be less than 0'],
      max: [100, 'Commission cannot exceed 100'],
    },

    theme: {
      logoLink: {
        type: String,
        default: "",
      },
      primaryColor: {
        type: String,
        default: "#4f46e5",
      },
      headerColor: {
        type: String,
        default: "#ffffff",
      },
      ctaColor: {
        type: String,
        default: "#4f46e5",
      },
    },
    
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active',
    },
  },

  {
    timestamps: true,
    versionKey: false
  }
);

vendorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Vendor', vendorSchema);