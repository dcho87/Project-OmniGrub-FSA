import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRest, findNearby, getGoogleRestaurant } from "../store";

export const HomeYelp = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [zip, setZip] = useState("");
  const onChange = (ev) => {
    //setZip(ev.target.value);
    setZip({ ...zip, zip: ev.target.value });
    console.log(zip);
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    try {
      dispatch(findNearby(zip.zip));
      dispatch(getGoogleRestaurant(zip.zip));
    } catch (error) {
      console.log(error);
    }
  };
  // const [ restaurants, setRestaurants ] = useState(state.restaurants);
  useEffect(() => {
    dispatch(getAllRest());
  }, []);

  let currentSpots = [];
  if (state.yelpSlice[0]) currentSpots = state.yelpSlice[0].businesses;

  return (
    <div>
      <h2>Home Component</h2>
      {console.log("state change!")}
      <form onSubmit={onSubmit}>
        <input onChange={onChange} name="zip" />
      </form>
      <ul>
        <div id="resList">
          {currentSpots.map((e) => (
            <div
              id="resBox"
              key={e.id}
              onClick={() => console.log("You clicked me!")}
            >
              <li>
                <img src={e.image_url} />
                <h3>{e.name}</h3>
                RATING: {e.rating} <br />
                REVIEW COUNT: {e.review_count}
              </li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};
