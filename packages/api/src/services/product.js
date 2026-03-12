const Product = require("../models/product");

class ProductService {

  //CREATE
  async create(payload) {
    return await Product.create(payload);
  }
  //GET
  async get(where = {}, options = {}) {

    const match = { ...where };
    if (match.search) {
      match.name = {
        $regex: match.search,
        $options: "i"
      };
      delete match.search;
    }
    const aggregate = Product.aggregate([

      { $match: match },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories"
        }
      }, 
      {
        $project: {
          name: 1,
          description: 1,
          stock: 1,
          status: 1,
          createdAt: 1,
          price: 1,
          categories: 1,
          image: 1,
        }
      }

    ]);
    const result = await Product.aggregatePaginate(aggregate, options);
    return result;
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



