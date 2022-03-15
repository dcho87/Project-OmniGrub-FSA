import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRest, findNearby } from "../store";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  // const [ restaurants, setRestaurants ] = useState(state.restaurants);
  useEffect(() => {
    dispatch(getAllRest());
    //temporary yelp call until zip code submission becomes available
    dispatch(findNearby(10024));
    // setRestaurants(state.restaurants)
  }, []);
  // console.log(restaurants);
  let currentSpots = [];
  if (state.yelpSlice[0]) currentSpots = state.yelpSlice[0].businesses;

  return (
    <div>
      <h2>Home Component</h2>
      <input type="text" placeholder="Zip Code"></input>
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

export default Home;
