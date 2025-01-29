import { configureStore } from "@reduxjs/toolkit";
import { HomepageSlice } from "../pages/homepage/HomepageSlice";
import { LanguageSlice } from "../utils/slices/LanguageSlice.js";
import { SubjectSlice } from "../pages/subjects/SubjectSlice.js";

export const store = configureStore({
  reducer: {
    Homepage: HomepageSlice.reducer,
    Language: LanguageSlice.reducer,
    Subject: SubjectSlice.reducer,
  },
});