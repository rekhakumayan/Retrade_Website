const Joi = require('joi');

exports.vendors = {

    save: {
        payload: Joi.object({

            contactName: Joi.string().trim().required().messages({
                'string.empty': 'Contact name is required',
                'any.required': 'Contact name is required',
            }),

            businessName: Joi.string().trim().required().messages({
                'string.empty': 'Business name is required',
                'any.required': 'Business name is required',
            }),

            email: Joi.string().email({ tlds: { allow: false } }).required().messages({
                'string.email': 'Please provide a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required',
            }),

            commissionRate: Joi.number().min(0).max(100).required().messages({
                'number.base': 'Commission rate must be a number',
                'number.min': 'Commission rate cannot be less than 0',
                'number.max': 'Commission rate cannot exceed 100',
                'any.required': 'Commission rate is required',
            }),

        }),
    },

    updateCommission: {
        payload: Joi.object({

            commissionRate: Joi.number().min(0).max(100).required().messages({
                'number.base': 'Commission rate must be a number',
                'number.min': 'Commission rate cannot be less than 0',
                'number.max': 'Commission rate cannot exceed 100',
                'any.required': 'Commission rate is required',
            }),

        }),
    },

    updateStatus: {
        payload: Joi.object({

            status: Joi.string().valid('active', 'inactive').required().messages({
                'any.only': 'Status must be either active or disabled',
                'any.required': 'Status is required',
            }),

        }),
    },

    updateStatusId: {
        params: Joi.object({

            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                'string.pattern.base': 'id must be a valid MongoDB ObjectId',
                'any.required': 'Vendor id is required',
            }),

        }),
    },

    fetchById: {
        params: Joi.object({

            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                'string.pattern.base': 'id must be a valid MongoDB ObjectId',
                'any.required': 'Vendor id is required',
            }),

        }),
    },

    updateCommissionId: {
        params: Joi.object({

            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                'string.pattern.base': 'id must be a valid MongoDB ObjectId',
                'any.required': 'Vendor id is required',
            }),

        }),
    },




};