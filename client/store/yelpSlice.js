import { createSlice } from "@reduxjs/toolkit";

export const yelpSlice = createSlice({
  name: "counter",
  initialState: {
    yelpStores: [],
  },
  reducers: {
    fill: (state) => {
      state.yelpStores = [...state.yelpStores, 1];
      console.log(state.yelpStores, "stores");
    },
  },
});

// Action creators are generated for each case reducer function
export const { fill } = yelpSlice.actions;

export default yelpSlice.reducer;
