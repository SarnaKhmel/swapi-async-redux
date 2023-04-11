import { configureStore } from "@reduxjs/toolkit";
import planetSlice from "./slice";
export const store = configureStore({
  reducer: {
    planets: planetSlice,
  },
});
