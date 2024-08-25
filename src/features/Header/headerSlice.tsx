import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMenu {
  opened: boolean;
  rotation: number;
  isOpenProfile: boolean;
}

const initialState: IMenu = {
  opened: false,
  rotation: 0,
  isOpenProfile: false,
};

// Создание slice
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    openMenu(state, action: PayloadAction<boolean>) {
      state.opened = action.payload;
    },
    setRotation(state, action: PayloadAction<number>) {
      state.rotation = action.payload;
    },
    setIsOpenProfile(state, action: PayloadAction<boolean>) {
      state.isOpenProfile = action.payload;
    },
  },
});

export const { openMenu, setRotation, setIsOpenProfile } = headerSlice.actions;

// Экспорт reducer
export default headerSlice.reducer;
