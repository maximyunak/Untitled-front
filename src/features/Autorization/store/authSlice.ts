import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store.ts";
// import { countries } from "../../../shared/constants.ts";
import { countries } from "@shared/constants.ts";
import { IUser } from "@shared/types/IUser.ts";

export interface IauthSlice extends IUser {
  emailError: boolean;
  passwordError: boolean;
  firstnameError: boolean;
  lastnameError: boolean;
}

const initialState: IauthSlice = {
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
const authSlice = createSlice({
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
    clearData: (state) => {
      state.email = "";
      state.password = "";
      state.country = countries[0];
      state.firstname = "";
      state.lastname = "";
      state.dateOfBirth = "";
      state.preferences = [];
      state.emailError = false;
      state.passwordError = false;
      state.firstnameError = false;
      state.lastnameError = false;
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
  clearData,
} = authSlice.actions;

// Selectors
export const selectEmail = (state: RootState) => state.authSlice.email;
export const selectPassword = (state: RootState) => state.authSlice.password;
export const selectCountry = (state: RootState) => state.authSlice.country;
export const selectFirstname = (state: RootState) => state.authSlice.firstname;
export const selectLastname = (state: RootState) => state.authSlice.lastname;
export const selectDateOfBirth = (state: RootState) =>
  state.authSlice.dateOfBirth;
export const selectPreferences = (state: RootState) =>
  state.authSlice.preferences;
export const selectEmailError = (state: RootState) =>
  state.authSlice.emailError;
export const selectPasswordError = (state: RootState) =>
  state.authSlice.passwordError;

// Экспорт reducer
export default authSlice.reducer;
