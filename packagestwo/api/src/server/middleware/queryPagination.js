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

      //(where[userId]) bracket notation to set parsedQuery after parsing - because hapi-query-builder unable to parse it 
      const rawQuery = request.query;
      const where = {};
      const options = {};

      Object.keys(rawQuery).forEach((key) => {
        const whereMatch = key.match(/^where\[(.+)\]$/);
        const optionsNestedMatch = key.match(/^options\[(.+)\]\[(.+)\]$/);
        const optionsMatch = key.match(/^options\[(.+)\]$/);

        if (whereMatch) {
          where[whereMatch[1]] = rawQuery[key];
        } else if (optionsNestedMatch) {
          if (!options[optionsNestedMatch[1]])
            options[optionsNestedMatch[1]] = {};
          options[optionsNestedMatch[1]][optionsNestedMatch[2]] = rawQuery[key];
        } else if (optionsMatch) {
          options[optionsMatch[1]] = rawQuery[key];
        }
      });

      if (!request.parsedQuery) {
        request.parsedQuery = { where, options };
      } else {
        Object.assign(request.parsedQuery.where, where);
        Object.assign(request.parsedQuery.options, options);
      }

      return h.continue;
    });

  }
};