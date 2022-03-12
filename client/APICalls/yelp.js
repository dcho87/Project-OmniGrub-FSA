import React from "react";
import axios from "axios";

const func = () =>
  axios.get(
    `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=NYC`,
    {
      headers: {
        Authorization: `Bearer ${"7Sx1VUh0USPACiiBiWX7XGU9IT6E0TPgGnxNHHQIzSiUUl1Kfgdp2HlEFJJ-i0rVrt00nRi3MItgQSwvqLebEa7sRiUFF1Q6_gOXiyEqYzSkGldDEAwbtfD8NQ4pYnYx"}`,
      },
      params: {
        categories: "coffee",
      },
    }
  ).data;

export default () => {
  const apiFunc = async () => await func();

  let boy = apiFunc();
  console.log(boy);

  return (
    <div>
      <h1>Testing Yelp API call</h1>
    </div>
  );
};
