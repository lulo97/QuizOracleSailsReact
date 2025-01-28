import { createSlice } from "@reduxjs/toolkit";

export const HomepageSlice = createSlice({
  name: "HomepageSlice",
  initialState: {
    count: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  increment,
  decrement,
  reset,
  startLoading,
  finishLoading,
  setError,
  clearError,
} = HomepageSlice.actions;