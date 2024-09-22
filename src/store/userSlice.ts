import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@shared/types/IUser";

interface userSlice {
  user: IUser;
  isLoggedIn: boolean;
}

const initialState = {
  user: null, // Или {} если вы хотите хранить пустой объект
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
