// Root reducer only combines feature reducers.
// Keep business logic inside feature modules under src/modules/*.
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/auth/auth.module";
import userReducer from "@/modules/user/user.module";
import productsReducer from "@/modules/products/products.module";
import partnersReducer from "@/modules/partners/partner.module";
import dashboardReducer from "@/modules/ovdashboard/dashboard.module";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productsReducer,
  partners: partnersReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
