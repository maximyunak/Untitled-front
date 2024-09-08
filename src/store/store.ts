import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./ThemeSlice";
import headerSlice from "../features/Header/headerSlice";
import { registrationSlice } from "../features/Autorization";
import userSlice from "../features/Autorization/store/userSlice";

const rootReduser = combineReducers({});

export const setupStore = () => {
  return configureStore({
    reducer: {
      themeSlice,
      headerSlice,
      registrationSlice,
      userSlice,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware), // for rtk-query
  });
};

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
// export type AppDispatch = typeof store.dispatch;
