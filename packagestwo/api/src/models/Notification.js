// models/Notification.js

const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
     vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    title: String,
    message: String,

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notifications", NotificationSchema);