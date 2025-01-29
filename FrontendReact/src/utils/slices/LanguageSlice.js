import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'vi',
};

export const LanguageSlice = createSlice({
  name: 'LanguageSlice',
  initialState: initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = LanguageSlice.actions;
