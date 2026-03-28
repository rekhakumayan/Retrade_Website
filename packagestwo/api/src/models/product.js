const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },

  price: {
    original: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // percentage
    final: { type: Number }
  },
  currency: {
    type: String,
    enum: ["INR", "USD", "EUR", "GBP", "JPY"],
    default: "INR"
  },

  stock: { type: Number, default: 0 },
 
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  image: { type: String, required: true },

  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }],
  

  // user: {
  //   _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //   name: { type: String },
  //   email: { type: String }
  // }
  

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  }

}, { timestamps: true });

productSchema.pre("save", function () {

  const discount = this.price.discount || 0;
  this.price.final =
    this.price.original - (this.price.original * discount) / 100;
});

productSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Product", productSchema);