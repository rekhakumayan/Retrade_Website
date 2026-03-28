const Joi =require('joi')
const updateShopSettingsSchema = Joi.object({
  logoLink: Joi.string().allow("").optional(),
  primaryColor: Joi.string().required(),
  headerColor: Joi.string().required(),
  ctaColor: Joi.string().required(),
});

