const Joi = require("joi");

exports.validateProduct = {
  payload: Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),

    // price: Joi.string().required(), 
    price: Joi.object({
      original: Joi.number().required(),
      discount: Joi.number().min(0).max(100).default(0)
    }).required(),

    stock: Joi.number().min(0).required(),

    image: Joi.any()
      .required()
      .messages({
        'any.required': 'Product image is required'
      }),
    currency: Joi.string()
      .valid("INR", "USD", "EUR", "GBP", "JPY")
      .required(),

    categories: Joi.array()
      .items(
        Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId validation
          .message("Invalid category ID")
      )
      .min(1)
      .required(),
  })
};

exports.updateProduct = {
  payload: Joi.object({
    name: Joi.string().min(3).optional(),

    description: Joi.string().min(5).optional(),

    price: Joi.object({
      original: Joi.number().optional(),
      discount: Joi.number().min(0).max(100).optional()
    }).optional(),

    currency: Joi.string()
      .valid("INR", "USD", "EUR", "GBP", "JPY")
      .optional(),

    stock: Joi.number().min(0).optional(),

    image: Joi.any().optional(),

    categories: Joi.array()
      .items(
        Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .message("Invalid category ID")
      )
      .min(1)
      .optional()
  })
    // important: at least ONE field must exist
    .min(1)
};

