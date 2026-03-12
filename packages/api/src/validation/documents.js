const Joi = require('joi');

exports.documents = {
  save: {
    payload: Joi.object({
      name: Joi.string().trim().required().messages({
        'string.empty': 'Document name is required',
        'any.required': 'Document name is required',
      }),
      content: Joi.string().optional().allow(''),
      type: Joi.string()
        .valid('pdf', 'docx', 'txt', 'markdown', 'html', 'other')
        .optional()
        .messages({
          'any.only':
            'Type must be one of: pdf, docx, txt, markdown, html, other',
        }),
      owner: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'string.pattern.base': 'Owner must be a valid ObjectId',
          'any.required': 'Owner is required',
        }),
      tags: Joi.array().items(Joi.string().trim()).optional(),
      fileSize: Joi.number().positive().optional().messages({
        'number.positive': 'File size must be a positive number',
      }),
      lastModifiedBy: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional()
        .messages({
          'string.pattern.base': 'lastModifiedBy must be a valid ObjectId',
        }),
      status: Joi.string()
        .valid('active', 'deleted')
        .optional()
        .default('active'),
    }),
  },

  update: {
    payload: Joi.object({
      name: Joi.string().trim().optional(),
      content: Joi.string().optional().allow(''),
      type: Joi.string()
        .valid('pdf', 'docx', 'txt', 'markdown', 'html', 'other')
        .optional(),
      tags: Joi.array().items(Joi.string().trim()).optional(),
      fileSize: Joi.number().positive().optional(),
      lastModifiedBy: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
      status: Joi.string().valid('active', 'deleted').optional(),
    }),
  },
};
