const Category = require("../models/category");

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

    const aggregate = Category.aggregate([
      { $match: where },
      {
        $sort: { createdAt: -1 }   // newest first
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categories",
          as: "products"
        }
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendors"
        }
      },
      {
        $unwind: {
          path: "$vendors",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          productCount: { $size: "$products" },
          productNames: {
            $map: {
              input: { $slice: ["$products", 3] },
              as: "p",
              in: "$$p.name"
            }
          }
        }
      },
      {
        $project: {
          products: 0,

        }
      },
    ]);
    return await Category.aggregatePaginate(aggregate, options)
  }

  //DELETE
  async delete(id) {
    return await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();