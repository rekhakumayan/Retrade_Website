
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/auth/auth.module";
import userReducer from "@/modules/user/user.module";
import productsReducer from "@/modules/products/products.module";
import categoryReducer from "@/modules/categories/categories.module"
import shopSettingReducer from "@/modules/shopSettings/shopSettings.module";
import ordersReducer from "@/modules/orders/orders.module"
import dashboardReducer from "@/modules/dashboard/dashboard.module"

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productsReducer,
  categories:categoryReducer,
  shop: shopSettingReducer, 
  orders: ordersReducer,
  dashboard:dashboardReducer
});

export default rootReducer;
