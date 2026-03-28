const Joi = require('joi');

const orders = {

  createOrder: {
    payload: Joi.object({

      vendorId: Joi.string().required().messages({
        'string.empty': 'Vendor ID is required',
        'any.required': 'Vendor ID is required',
      }),

      items: Joi.array().items(
        Joi.object({

          productId: Joi.string().required().messages({
            'string.empty': 'Product ID is required',
            'any.required': 'Product ID is required',
          }),

          quantity: Joi.number().min(1).required().messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required',
          }),

        })
      ).min(1).required().messages({
        'array.base': 'Items must be an array',
        'array.min': 'At least one item is required',
        'any.required': 'Items are required',
      }),

      address: Joi.object().required().messages({
        'object.base': 'Address must be an object',
        'any.required': 'Address is required'
      }),

      payment: Joi.object({
        method: Joi.string().valid('cod', 'online').default('cod')
      }).optional()
    }),
  },

  updateOrder: {
    payload: Joi.object({

      status: Joi.string()
        .valid('pending', 'confirmed', 'placed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled')
        .messages({
          'any.only': 'Invalid status',
          'string.base': 'Invalid status'
        }),

      address: Joi.object().optional(),

      payment: Joi.object({
        method: Joi.string().valid('cod', 'online').optional(),
      }).optional()

    })
  }

};

module.exports = { orders };