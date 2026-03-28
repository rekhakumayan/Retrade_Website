
const UserServices = require('../../services/User');
const userServices = new UserServices()

const loginMiddleware = () => {
  return async (request, h) => {
    try {
      const { email } = request.payload;
      const platform = request.query.platform;

      if (!email || !platform) {
        return h
          .response({ message: 'Email and platform are required' })
          .code(400)
          .takeover();
      }

        const user = await userServices.login(email)
        if (!user) {
          return h
            .response({ message: 'Invalid email or password' })
            .code(401)
            .takeover();
        }
        
      const rolePlatformMap = {
        customer: 'webapp',
        partner: 'partnerapp',
        admin: 'opsapp',
      };

      if (rolePlatformMap[user.role] !== platform) {
        return h
          .response({
            message: `Role "${user.role}" cannot login from platform "${platform}"`,
          })
          .code(403)
          .takeover();
      }

      request.user = user;

      return h.continue;
    } catch (err) {
      return h
        .response({ message: 'Login validation failed', error: err.message })
        .code(500)
        .takeover();
    }
  };
};

module.exports = loginMiddleware