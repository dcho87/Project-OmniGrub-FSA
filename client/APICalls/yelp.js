import React from "react";
import axios from "axios";

export default () => {
  const apiFunc = () =>
    axios.get(
      `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=NYC`,
      {
        headers: {
          Authorization: `Bearer ${""}`,
        },
        params: {
          categories: "coffee",
        },
      }
    ).data;

  let boy = apiFunc();
  console.log(boy);

  return (
    <div>
      <h1>Testing Yelp API call</h1>
    </div>
  );
};
