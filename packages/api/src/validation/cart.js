const Joi = require('joi');

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({ 'string.pattern.base': 'Invalid ID format' });

const cart = {
  addToCart: {
    payload: Joi.object({
      productId: objectId.required().messages({
        'any.required': 'Product ID is required',
      }),
      quantity: Joi.number()
        .integer()
        .min(1)
        .max(10)
        .default(1)
        .messages({
          'number.min': 'Quantity must be at least 1',
          'number.max': 'Maximum 10 items allowed per product',
        }),
    }),
  },

  updateQuantity: {
    params: Joi.object({
      cartItemId: objectId.required().messages({
        'any.required': 'Cart item ID is required',
      }),
    }),
    payload: Joi.object({
      quantity: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .required()
        .messages({
          'any.required': 'Quantity is required',
          'number.min': 'Quantity cannot be negative',
          'number.max': 'Maximum 10 items allowed',
        }),
    }),
  },

  cartItemId: {
    params: Joi.object({
      cartItemId: objectId.required().messages({
        'any.required': 'Cart item ID is required',
      }),
    }),
  },
};

module.exports = { cart };