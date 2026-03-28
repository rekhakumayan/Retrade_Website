// Root reducer only combines feature reducers.
// Keep business logic inside feature modules under src/modules/*.
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/auth/auth.module";
import userReducer from "@/modules/user/user.module";
import productsReducer from "@/modules/products/products.module";
import partnersReducer from "@/modules/partners/partner.module";
import dashboardReducer from "@/modules/ovdashboard/dashboard.module";
import salesReducer from "@/modules/sales/services/sales.module";
import customersReducer from '@/modules/customers/services/customers.module';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productsReducer,
  partners: partnersReducer,
  dashboard: dashboardReducer,
  sales: salesReducer,
  customers: customersReducer
});

export default rootReducer;
