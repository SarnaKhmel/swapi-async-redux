import { configureStore } from "@reduxjs/toolkit";
import planetSlice from "./slice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    planets: planetSlice,
    auth: authSlice,
  },
});
