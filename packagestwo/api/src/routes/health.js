module.exports = {
  plugin: {
    async register(server) {
      server.route([
        {
          method: 'GET',
          path: '/',
          options: {
            auth: false,
            tags: ['api', 'Health'],
            validate: {},
            pre: [],
            handler: function (request, h) {
              return h
                .response({
                  statusCode: 200,
                  message: 'API health is good!',
                  data: {},
                })
                .code(200);
            },
            description: 'Test api health',
          },
        },
      ]);
    },
    version: process.env.API_VERSION,
    name: 'health',
  },
};
