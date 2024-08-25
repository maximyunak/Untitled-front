import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITheme {
  darkmode: boolean;
}

const initialState: ITheme = {
  darkmode: true,
};

// Создание slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<boolean>) {
      state.darkmode = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

// Экспорт reducer
export default themeSlice.reducer;
