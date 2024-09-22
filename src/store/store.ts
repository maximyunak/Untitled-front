import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./ThemeSlice";
import headerSlice from "../features/Header/store/headerSlice";
import { registrationSlice } from "../features/Autorization";
import authSlice from "../features/Autorization/store/authSlice";
import { authApi } from "@shared/api/authApi";
import userSlice from "./userSlice";

const rootReduser = combineReducers({});

export const setupStore = () => {
  return configureStore({
    reducer: {
      themeSlice,
      headerSlice,
      registrationSlice,
      authSlice,
      userSlice,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
// export type AppDispatch = typeof store.dispatch;
