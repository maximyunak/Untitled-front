import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store.ts";

export interface IRegistration {
  step: number;
  type: number;
  visibleCountry: boolean;
}

const initialState: IRegistration = {
  step: 1,
  type: 0,
  visibleCountry: false,
};

// Создание slice
const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    plusStep(state) {
      if (state.step < 3) {
        state.step += 1;
        state.type = 0;
      }
    },
    minusStep(state) {
      if (state.step > 1) {
        state.step -= 1;
        state.type = 1;
      }
    },
    setStep(state, action: PayloadAction<number>) {
      if (state.step < action.payload) {
        state.type = 0;
      } else {
        state.type = 1;
      }
      state.step = action.payload;
    },
    setVisibleCountry(state, action: PayloadAction<boolean>) {
      state.visibleCountry = action.payload;
    },
  },
});

export const selectStep = (state: RootState) => state.registrationSlice.step;
export const selectType = (state: RootState) => state.registrationSlice.type;
export const selectVisibleCounty = (state: RootState) =>
  state.registrationSlice.visibleCountry;

export const { plusStep, minusStep, setStep, setVisibleCountry } =
  registrationSlice.actions;

// Экспорт reducer
export default registrationSlice.reducer;
