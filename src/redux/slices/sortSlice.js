import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./cardSlice";


export const sortSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    testSlicFn : (state) => {
        state.cardAlreadyPresent = true;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
    testSlicFn
} = sortSlice.actions;

export default sortSlice.reducer;
