import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fill } from "../store";

export default function Yelp() {
  const yelp = useSelector((state) => state.yelp);
  let yelpStores;
  yelp? yelpStores = yelp.yelpStores : null;
  console.log(yelpStores);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(fill())}>Yelp Button</button>
    </div>
  );
}
