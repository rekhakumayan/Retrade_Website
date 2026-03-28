const Category = require("../models/category");
const mongoose = require("mongoose");

class CategoryService {

  //CREATE
  async create(data) {
    const exists = await Category.findOne({ name: data.name });
    if (exists) {
      throw new Error("Category already exists");
    }
    return await Category.create(data);
  }

  //GET
  async get(where, options) {
    if (where.vendorId) {
      if (mongoose.Types.ObjectId.isValid(where.vendorId)) {
        where.vendorId = new mongoose.Types.ObjectId(where.vendorId);
      } else {
        throw new Error("Invalid vendorId");
      }
    }
    const aggregate = Category.aggregate([
      {
        $match: where
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    return await Category.aggregatePaginate(aggregate,options);
  }
  //DELETE
  async delete(id) {
    return await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();