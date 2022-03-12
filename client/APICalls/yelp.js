import React, { useState, useEffect } from "react";
import axios from "axios";
// require("dotenv").config();

let ball = [];
async function fetchData(zipcode) {
  try {
    if (!zipcode) return;
    const result = await axios.get(
      `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${zipcode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY_YELP}`,
        },
        params: {
          categories: "coffee",
        },
      }
    );
    console.log(result.data);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default () => {
  let queryParams = new URLSearchParams(window.location.href);
  let array = [];
  for (let item of queryParams) {
    array.push(item);
  }
  const zip = array[0][1];
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    console.log(places, "inside useeffect");
  });

  return (
    <div>
      <h1>
        <button onClick={() => setPlaces(fetchData(zip))}>Click</button>
      </h1>
    </div>
  );
};
