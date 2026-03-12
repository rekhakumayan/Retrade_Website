// middleware/queryPagination.js
module.exports = {
  name: "queryPagination",
  version: "1.0.0",
  register: async function (server) {

    server.ext("onPreHandler", (request, h) => {

      if (request.parsedQuery) {
        const { where, options } = request.parsedQuery;

        // Move page & limit into options
        if (where?.page) options.page = Number(where.page);
        if (where?.limit) options.limit = Number(where.limit);

        // Remove from where (optional but clean)
        delete where.page;
        delete where.limit;
      }

      return h.continue;
    });

  }
};