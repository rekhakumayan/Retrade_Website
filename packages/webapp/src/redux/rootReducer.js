// Root reducer only combines feature reducers.
// Keep business logic inside feature modules under src/modules/*.
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/auth/auth.module";
import userReducer from "@/modules/user/user.module";
import productsReducer from "@/modules/products/products.module";
import categoriesReducer from "@/modules/categories/categories.module";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productsReducer,
  categories: categoriesReducer,
});

export default rootReducer;
