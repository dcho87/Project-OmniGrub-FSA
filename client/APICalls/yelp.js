import React from "react";
import axios from "axios";

export const YelpSeeder = () => {
  const api = axios.get("https://api.yelp.com/v3/businesses/search", {
    headers: {
      Authorization: `Bearer ${"7Sx1VUh0USPACiiBiWX7XGU9IT6E0TPgGnxNHHQIzSiUUl1Kfgdp2HlEFJJ-i0rVrt00nRi3MItgQSwvqLebEa7sRiUFF1Q6_gOXiyEqYzSkGldDEAwbtfD8NQ4pYnYx"}`,
    },
    params: {
      location: "San Diego",
      categories: "breakfast_brunch",
    },
  }).data;
  console.log(api);
  return <div></div>;
};
