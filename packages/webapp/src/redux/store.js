// Global Redux store configuration.
// This file should stay minimal and only wire reducers + middleware.
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

export default store;