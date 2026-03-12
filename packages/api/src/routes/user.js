const UserController = require('../controllers/User');
const loginMiddleware = require('../server/middleware/auth')
const { users } = require('../validation/user');

module.exports = {
  plugin: {
    async register(server) {
      server.route([

        {
          method: 'POST',
          path: '/signup',
          options: {
            auth: false,
            tags: ['api', 'auth'],
            validate: {
              payload: users.signup.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            pre: [],
            handler: UserController.signup,
            description: 'Register a new user',
          },
        },

        {
          method: 'POST',
          path: '/login',
          options: {
            auth: false,
            tags: ['api', 'auth'],
            validate: {
              payload: users.login.payload,
              query: users.login.query,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            // pre: [{
            //   method: loginMiddleware()
            // }],
            handler: UserController.login,
            description: 'User logged in successfully',
          },
        },


        {
          method: 'POST',
          path: '/set-password',
          options: {
            auth: false,
            tags: ['api', 'auth'],
            validate: {
              payload: users.setPassword.payload,
              options: { stripUnknown: true },
              failAction: async (request, h, err) => { throw err; },
            },
            pre: [],
            handler: UserController.setPassword,
            description: 'Vendor sets password on first login — no token needed',
          },
        },

      ]);
    },
    version: process.env.API_VERSION,
    name: 'auth',
  },
};