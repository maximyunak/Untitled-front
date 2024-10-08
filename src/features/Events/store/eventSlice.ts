import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEventSlice {
  selectedCategories: string[];
  selectedCountries: string[];
  titleFilter: string;
}

const initialState: IEventSlice = {
  selectedCategories: [],
  selectedCountries: [],
  titleFilter: "",
};

// Создание slice
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      if (!state.selectedCategories.includes(action.payload)) {
        state.selectedCategories.push(action.payload);
      }
    },
    removeCategoryFilter: (state, action: PayloadAction<string>) => {
      state.selectedCategories = state.selectedCategories.filter(
        (category) => category !== action.payload
      );
    },
    setCountryFilter: (state, action: PayloadAction<string>) => {
      if (!state.selectedCountries.includes(action.payload)) {
        state.selectedCountries.push(action.payload);
      }
    },
    removeCountryFilter: (state, action: PayloadAction<string>) => {
      state.selectedCountries = state.selectedCountries.filter(
        (country) => country !== action.payload
      );
    },
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.titleFilter = action.payload;
    },
  },
});

// Actions
export const {
  setCategoryFilter,
  removeCategoryFilter,
  removeCountryFilter,
  setCountryFilter,
  setTitleFilter,
} = eventSlice.actions;

export default eventSlice.reducer;
