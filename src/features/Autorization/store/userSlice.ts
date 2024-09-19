import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store.ts";
// import { countries } from "../../../shared/constants.ts";
import { countries } from "../helpers/constants.ts";

export interface IUser {
  email: string;
  password: string;
  country: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  preferences: string[];

  emailError: boolean;
  passwordError: boolean;
  firstnameError: boolean;
  lastnameError: boolean;
}

const initialState: IUser = {
  email: "",
  password: "",
  country: countries[0],
  firstname: "",
  lastname: "",
  dateOfBirth: "",
  preferences: [],

  emailError: false,
  passwordError: false,
  firstnameError: false,
  lastnameError: false,
};

// Создание slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      state.email = action.payload;
      state.emailError = !emailRegex.test(action.payload);
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.passwordError = action.payload.trim().length === 0;
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
    validateFields: (state) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      state.emailError = !emailRegex.test(state.email);
      state.passwordError = state.password.trim().length < 3;
    },
    validateData: (state) => {
      state.firstnameError = state.firstname.trim().length < 3;
      state.lastnameError = state.lastname.trim().length < 3;
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
  validateFields,
  validateData,
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
export const selectEmailError = (state: RootState) =>
  state.userSlice.emailError;
export const selectPasswordError = (state: RootState) =>
  state.userSlice.passwordError;

// Экспорт reducer
export default userSlice.reducer;
