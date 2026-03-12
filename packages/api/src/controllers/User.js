const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../lib/utils/ErrorHandler');
const UserServices = require('../services/User');
const CartServices = require('../services/Cart');

const userServices = new UserServices();

class UserController {
  //SIGN UP
  static async signup(request, h) {
    try {
      const payload = request.payload
      const isUserAlreadyExists = await userServices.login(payload.email);
      if (isUserAlreadyExists) {
        return h.response({
          statusCode: 409,
          message: 'Email already exists',
        }).code(409);
      }

      const hashedPassword = await bcrypt.hash(request.payload.password, 10);
      payload.password = hashedPassword
      const newUser = await userServices.signup(payload);

      return h.response({
        statusCode: 201,
        message: 'User registered successfully',
        data: {
          userId: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
          createdAt: newUser.createdAt,
        },
      }).code(201);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  //LOGIN 
  static async login(request, h) {
    try {
      const users = await userServices.findAllUsers();
      console.log("===============================================DB URL:", process.env.DB_URL);
      console.log("====================================All users from DB:", users);
      console.log("============================= request.payload.email")
      console.log(request.payload.email)

      const user = await userServices.login(request.payload.email);
      const platform = request.query.platform;
      console.log("===================================user ")
      console.log(user)


      if (!user) {
        return h.response({
          statusCode: 404,
          message: 'Invalid email or password',
        }).code(404);
      }

      if (user.status !== 'active') {
        return h.response({
          statusCode: 403,
          message: 'Your account has been deactivated',
        }).code(403);
      }

      if (user.password === null) {
        return h.response({
          statusCode: 200,
          message: 'first_login',
          data: {
            email: user.email,
            mustSetPassword: true,
          },
        }).code(200);
      }

      const isPasswordValid = await bcrypt.compare(request.payload.password, user.password);
      if (!isPasswordValid) {
        return h.response({
          statusCode: 401,
          message: 'Invalid email or password',
        }).code(401);
      }


      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          iat: Date.now(),
          platform,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );


      return h.response({
        statusCode: 200,
        message: 'Login successful',
        data: {
          token,

          user: {
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
          },
        },
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }

  // SET PASSWORD
  static async setPassword(request, h) {
    try {

      const user = await userServices.login(request.payload.email);
      if (!user) {
        return h.response({
          statusCode: 404,
          message: 'User not found',
        }).code(404);
      }


      if (user.password !== null) {
        return h.response({
          statusCode: 400,
          message: 'Password already set. Please login normally.',
        }).code(400);
      }

      const hashedPassword = await bcrypt.hash(request.payload.password, 10);
      await userServices.updatePassword(user.email, hashedPassword);

      return h.response({
        statusCode: 200,
        message: 'Password set successfully. You can now login.',
      }).code(200);

    } catch (error) {
      return ErrorHandler.error(error, { msg: error, code: 400 });
    }
  }
}

module.exports = UserController;