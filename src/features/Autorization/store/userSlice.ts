import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store.ts";

export interface IUser {
  email: string;
  password: string;
  country: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  preferences: string[];
}

const initialState: IUser = {
  email: "",
  password: "",
  country: "",
  firstname: "",
  lastname: "",
  dateOfBirth: "",
  preferences: [],
};

// Создание slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPreference: (state, action: PayloadAction<string>) => {
      if (!state.preferences.includes(action.payload)) {
        state.preferences.push(action.payload);
      }
    },
    removePreference: (state, action: PayloadAction<string>) => {
      state.preferences = state.preferences.filter(
        (pref) => pref !== action.payload
      );
    },
  },
});

export const { addPreference, removePreference } = userSlice.actions;

export const selectPreferences = (state: RootState) =>
  state.userSlice.preferences;

// Экспорт reducer
export default userSlice.reducer;
