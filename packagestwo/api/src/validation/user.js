const Joi = require("joi");

const addressData = Joi.object({
  tag: Joi.string()
    .valid("Home", "Work", "Other")
    .default("Home")
    .messages({ "any.only": "Tag must be Home, Work, or Other" }),
  houseNo: Joi.string().max(10).messages({
    "string.empty": "House / Flat no. is required",
  }),
  street: Joi.string().max(20).messages({
    "string.empty": "Street is required",
  }),
  city: Joi.string()
    .pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .max(15)
    .messages({ "string.pattern.base": "City can only contain letters" }),
  pincode: Joi.string()
    .pattern(/^[1-9][0-9]{5}$/)
    .messages({ "string.pattern.base": "Enter a valid pincode" }),
  country: Joi.string()
    .pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .max(20)
    .messages({ "string.pattern.base": "Country can only contain letters" }),
});

const users = {
  signup: {
    payload: Joi.object({
      name: Joi.string().min(2).max(30).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name must not exceed 30 characters",
        "any.required": "Name is required",
      }),

      email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
      }),

      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "any.required": "Password is required",
      }),
      allowedVendors: Joi.array()
        .required()
        .items(
          Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .messages({
              "string.pattern.base":
                "vendorId must be a valid MongoDB ObjectId",
            }),
        ),
    }),
  },

  login: {
    payload: Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
      }),

      password: Joi.string().required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
      }),
      vendorId: Joi.string().when('$platform', {
        is: 'vendorapp',
        then: Joi.required(),
        otherwise: Joi.optional(),
      })
    }),
    query: Joi.object({
      platform: Joi.string().required(),
    }),
  },

  setPassword: {
    payload: Joi.object({
      token: Joi.string().required().messages({
        "string.empty": "Token is required",
        "any.required": "Token is required",
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "any.required": "Password is required",
      }),
    }),
  },
  updateUser: {
    payload: Joi.object({
      name: Joi.string()
        .pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
        .min(3)
        .max(20)
        .messages({
          "string.empty": "Name is required",
          "string.min": "Name must be at least 3 characters",
          "string.max": "Name must not exceed 30 characters",
          "string.pattern.base": "Name can only contain letters",
        }),

      addressAction: Joi.object({
        addressId: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .messages({
            "string.pattern.base": "addressId must be a valid MongoDB ObjectId",
          }),

        data: addressData,

        delete: Joi.boolean(),

        isDefault: Joi.boolean(),
      }).custom((value, helpers) => {
        const { addressId, data, delete: del, isDefault } = value;

        if (!addressId && !data) {
          return helpers.error("any.invalid", {
            message: "data is required when adding a new address",
          });
        }

        if (del && isDefault) {
          return helpers.error("any.invalid", {
            message: "delete and isDefault cannot be used together",
          });
        }

        if (addressId && !del && !isDefault && !data) {
          return helpers.error("any.invalid", {
            message: "data is required for address update",
          });
        }

        return value;
      }),
    })
      .or("name", "addressAction")
      .messages({
        "object.missing": "Provide name or addressAction",
      }),
  },
};
module.exports = { users };
