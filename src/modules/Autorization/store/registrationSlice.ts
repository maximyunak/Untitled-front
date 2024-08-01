import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export interface IRegistration {
  step: number;
  type: number;
}

const initialState: IRegistration = {
  step: 1,
  type: 0,
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
  },
});

export const selectStep = (state: RootState) => state.registrationSlice.step;
export const selectType = (state: RootState) => state.registrationSlice.type;

export const { plusStep, minusStep } = registrationSlice.actions;

// Экспорт reducer
export default registrationSlice.reducer;
