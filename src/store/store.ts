import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from './ThemeSlice';
import headerSlice from '../features/Header/store/headerSlice';
import { registrationSlice } from '../features/Autorization';
import authSlice from '../features/Autorization/store/authSlice';
import { authApi } from '@shared/api/authApi';
import userSlice from './userSlice';
import { eventApi } from '@shared/api/eventApi';
import { eventSlice } from '@features/Events';

const rootReduser = combineReducers({});

export const setupStore = () => {
  return configureStore({
    reducer: {
      themeSlice,
      headerSlice,
      registrationSlice,
      authSlice,
      userSlice,
      eventSlice,
      [authApi.reducerPath]: authApi.reducer,
      [eventApi.reducerPath]: eventApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware).concat(eventApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
// export type AppDispatch = typeof store.dispatch;
