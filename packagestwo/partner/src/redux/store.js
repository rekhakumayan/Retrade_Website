
'use client'

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import rootReducer from "./rootReducer";

const AuthTransform = createTransform(
  // before saving to localStorage
  (inboundState) => {
    return {
      token: inboundState.token,
      user: inboundState.user
    };
  },

  // when loading from localStorage
  (outboundState) => {
    return {
      token: outboundState.token,
      user: outboundState.user
    };
  },

  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "token",
  storage,
  whitelist: ["auth"],
  transforms: [AuthTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
