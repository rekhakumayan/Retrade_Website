// Global Redux store configuration.
// This file should stay minimal and only wire reducers + middleware.
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const loadAuthFromStorage = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!token && !user) return undefined;
    return { auth: { token, user, loading: false, error: null } };
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
