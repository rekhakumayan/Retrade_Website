const axios = require("axios");

class OrderService {

  async get() {
    const res = await axios.get(
      "https://dummyjson.com/c/755a-5ecc-4580-8b41"
    );

    return res.data.users || [];
  }

}

module.exports = new OrderService();