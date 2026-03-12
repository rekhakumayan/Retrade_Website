const Boom = require('@hapi/boom');
const { includes, get, has, isEmpty } = require('lodash');

class ErrorHandler {
  /**
   * Match error instance with node popular error instance
   * @param {*} error error
   * @returns {Boolean} true/false
   */
  async isReferenceError(error) {
    if (
      error instanceof ReferenceError ||
      error instanceof SyntaxError ||
      error instanceof RangeError ||
      error instanceof TypeError
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Match error with mongoose error prototype name
   * @param {*} error error
   * @returns {Boolean} true/false
   */
  async isMongooseError(error) {
    const mongoErrorName = [
      'MongooseError',
      'CastError',
      'DisconnectedError',
      'DivergentArrayError',
      'MissingSchemaError',
      'DocumentNotFoundError',
      'ValidatorError',
      'ValidationError',
      'ValidatorError',
      'MissingSchemaError',
      'ObjectExpectedError',
      'ObjectParameterError',
      'OverwriteModelError',
      'ParallelSaveError',
      'StrictModeError',
      'VersionError',
    ];
    if (!(error || typeof error === 'object')) return false;
    else if (!get(error, 'name', false)) return false;
    else if (includes(mongoErrorName, error.name)) return true;
  }

  /**
   * Handle error according to there type
   * @param {Error/String/Object} err error
   * @returns {*} throw error
   */
  async error(err, customError = { msg: '', code: null }) {
    if (Boom.isBoom(err)) {
      throw err;
    } else {
      const error = new Boom.Boom(err, { statusCode: 500 });
      if (this.isReferenceError(err) || this.isMongooseError(err)) {
        if (err.code === 11000) {
          error.output.payload.error = 'Email must be unique!';
        } else {
          error.output.payload.error = err.toString();
        }
      }
      if (has(customError, 'msg') && isEmpty(customError.msg)) {
        error.output.payload.message = customError.msg;
      }
      if (has(customError, 'code') && isEmpty(customError.code)) {
        if (err.code === 11000) {
          error.output.statusCode = 409;
          error.output.payload.statusCode = 409;
        } else {
          error.output.statusCode = customError.code;
          error.output.payload.statusCode = customError.code;
        }
      }
      throw error;
    }
  }
}

const errorHandler = new ErrorHandler();
module.exports = errorHandler;
