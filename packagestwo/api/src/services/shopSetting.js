const ShopSettingsModel=require('../models/shopSetting')

const getShopSettingsService = async () => {
  return await ShopSettings.findOne();
};

const updateShopSettingsService = async (payload) => {
  const updated = await ShopSettingsModel.findOneAndUpdate(
    {},
    payload,
    {
      new: true,
      upsert: true,
    }
  );

  return updated;
};

module.exports={getShopSettingsService,updateShopSettingsService}