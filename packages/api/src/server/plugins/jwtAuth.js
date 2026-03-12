const HapiAuthJwt2 = require('hapi-auth-jwt2');

const jwtPlugin = {
  name: 'jwt-auth-plugin',
  version: '1.0.0',
  register: async function (server, options) {
    await server.register({ plugin: HapiAuthJwt2 });

    const validate = async (decoded, request, h) => {
      // Basic validation - extend to check user exists in DB
      if (decoded && decoded.userId) {
        return { isValid: true };
      }
      return { isValid: false };
    };

    server.auth.strategy('jwt', 'jwt', {
      complete: true,
      key: process.env.JWT_SECRET || 'default_secret',
      validate,
      headerKey: 'authorization',
      tokenType: 'Bearer',
      verifyOptions: {
        algorithms: false, // process.env.NODE_ENV === 'development' ? false : ['RS256'],
      },
    });

    // Do not set default strategy globally to avoid forcing all routes.
  },
};

module.exports = jwtPlugin;
