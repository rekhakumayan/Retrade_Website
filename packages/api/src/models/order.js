const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  orderId: String,

  vendorId: String,

  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor"
  },

  price: Number,
  commissionAmount: Number,
  status: String,
  customerName: String,
  paymentMethod: String,
  vendorOwnerName: String,
  vendorShopName: String,

  createdAt: Date
},
{ collection: "orders" }
);

module.exports = mongoose.model("Order", orderSchema);