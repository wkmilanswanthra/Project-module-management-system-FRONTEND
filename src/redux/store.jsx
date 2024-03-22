import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from "../features/auth/store/auth.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
