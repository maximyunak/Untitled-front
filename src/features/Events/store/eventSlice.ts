import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IEventSlice {
  categories: string[];
}

const initialState: IEventSlice = {
  categories: [],
};

// Создание slice
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category !== action.payload);
    },
  },
});

// Actions
export const { setCategory, removeCategory } = eventSlice.actions;

export default eventSlice.reducer;
