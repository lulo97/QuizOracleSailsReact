import { configureStore } from "@reduxjs/toolkit";
import { HomepageSlice } from "../pages/homepage/HomepageSlice";

export const store = configureStore({
  reducer: {
    Homepage: HomepageSlice.reducer,
  },
});