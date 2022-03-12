import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fill } from "../src/slices/yelpSlice.js";

export default function Yelp() {
  const yelpStores = useSelector((state) => state.yelp.yelpStores);
  console.log(yelpStores);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(fill())}>Yelp Button</button>
    </div>
  );
}
