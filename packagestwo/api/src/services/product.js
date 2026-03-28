const Product = require("../models/product");
const mongoose = require("mongoose");

class ProductService {

  //CREATE
  async create(payload) {
    return await Product.create(payload);
  }
  
  //GET
  async get(where, options) {
      const sortOption = where.sort;
      delete where.sort;
      
      if (where.vendorId) {
        if (mongoose.Types.ObjectId.isValid(where.vendorId)) {
          where.vendorId = new mongoose.Types.ObjectId(where.vendorId);
        } else {
          throw new Error("Invalid vendorId");
        }
      }

      let sortStage = { createdAt: -1 };

      if (sortOption === "priceLow") {
        sortStage = { "price.final": 1 };
      }

      if (sortOption === "priceHigh") {
        sortStage = { "price.final": -1 };
      }
      const aggregate = Product.aggregate([
        {
          $lookup: {
            from: "categories",          // categories collection
            localField: "categories",    // product.categories
            foreignField: "_id",         // category._id
            as: "categoryData"           // new joined field
          }
        },
        {
          $match: where
        },
        {
          $sort: sortStage
        }
      ]); 
      return await Product.aggregatePaginate(aggregate,options);
  }
    
  //UPDATE
  async update(id, payload) {
    return await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });
  }

  // DELETE PRODUCT
  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

}

module.exports = new ProductService();



