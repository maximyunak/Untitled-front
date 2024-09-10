import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store.ts";
import { countries } from "../helpers/constants.ts";

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
  country: countries[0],
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
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setFirstname: (state, action: PayloadAction<string>) => {
      state.firstname = action.payload;
    },
    setLastname: (state, action: PayloadAction<string>) => {
      state.lastname = action.payload;
    },
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
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

// Actions
export const {
  setEmail,
  setPassword,
  setCountry,
  setFirstname,
  setLastname,
  setDateOfBirth,
  addPreference,
  removePreference,
} = userSlice.actions;

// Selectors
export const selectEmail = (state: RootState) => state.userSlice.email;
export const selectPassword = (state: RootState) => state.userSlice.password;
export const selectCountry = (state: RootState) => state.userSlice.country;
export const selectFirstname = (state: RootState) => state.userSlice.firstname;
export const selectLastname = (state: RootState) => state.userSlice.lastname;
export const selectDateOfBirth = (state: RootState) =>
  state.userSlice.dateOfBirth;
export const selectPreferences = (state: RootState) =>
  state.userSlice.preferences;

// Экспорт reducer
export default userSlice.reducer;
