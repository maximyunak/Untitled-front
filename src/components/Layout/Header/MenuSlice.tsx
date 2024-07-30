import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMenu {
  opened: boolean;
  rotation: number;
}

const initialState: IMenu = {
  opened: false,
  rotation: 0,
};

// Создание slice
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu(state, action: PayloadAction<boolean>) {
      state.opened = action.payload;
    },
    setRotation(state, action: PayloadAction<number>) {
      state.rotation = action.payload;
    },
  },
});

export const { openMenu, setRotation } = menuSlice.actions;

// Экспорт reducer
export default menuSlice.reducer;
