import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./ThemeSlice";
import menuSlice from "../components/Layout/Header/MenuSlice";

const rootReduser = combineReducers({});

export const setupStore = () => {
  return configureStore({
    reducer: {
      themeSlice,
      menuSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware), // for rtk-query
  });
};

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
// export type AppDispatch = typeof store.dispatch;
