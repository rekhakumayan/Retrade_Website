
const Joi = require("joi");

exports.categorySchema = {
  payload: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(200).required()
  })
};

exports.searchCategory = {
  query: Joi.object({
    name: Joi.string().min(1).required().messages({
    "any.required": "Search category is required"
  })
  })
};