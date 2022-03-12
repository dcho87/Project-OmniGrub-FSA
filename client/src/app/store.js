import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import yelpReducer from "../slices/yelpSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    yelp: yelpReducer,
  },
});
