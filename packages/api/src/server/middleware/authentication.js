const HapiAuthJwt2 = require('hapi-auth-jwt2');

const authentication = {
  name: 'jwt-auth-plugin',
  version: '1.0.0',
  register: async function (server) {

    await server.register({ plugin: HapiAuthJwt2 });

    const validate = async (decoded, request, h) => {
        console.log("DECODED TOKEN => ", decoded);
      if (decoded && decoded.userId) {
        return {
          isValid: true,
          credentials: decoded,
        };

        
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
        algorithms: false,
      },
    });

  
    server.method('isAdmin', async (request, h) => {
      if (request.auth.credentials.role !== 'admin') {
        return h.response({
          statusCode: 403,
          message: 'Access denied',
        }).code(403).takeover();
      }
      return h.continue;
    });

  
    server.method('isPartner', async (request, h) => {
      if (request.auth.credentials.role !== 'partner') {
        return h.response({
          statusCode: 403,
          message: 'Access denied',
        }).code(403).takeover();
      }
      return h.continue;
    });

    
    server.method('isCustomer', async (request, h) => {
      if (request.auth.credentials.role !== 'customer') {
        return h.response({
          statusCode: 403,
          message: 'Access denied',
        }).code(403).takeover();
      }
      return h.continue;
    });

  },
};

module.exports = authentication;