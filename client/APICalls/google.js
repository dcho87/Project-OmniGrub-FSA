import React from "react";
import axios from "axios";

const api_key = process.env.SECRET_KEY_GOOGLE;
let lat;
let lng;
let placeId;

//Get Geo location data
const geoData = () =>
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: "1251 Avenue of Americas",
        key: api_key,
      },
    })
    .then(function (response) {
      lat = response.data.results[0].geometry.location.lat.toString();
      lng = response.data.results[0].geometry.location.lng.toString();
      placeId = response.data.results[0].place_id;
      console.log("GeoData", response);
    })
    .catch(function (error) {
      console.log(error);
    });

//Get Place detail data
const placesData = () => {
  axios
    .get(
      `${"https://cors-anywhere.herokuapp.com/"}https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          key: api_key,
          place_id: "ChIJkwNptPhYwokRFVgCsuHriwI",
          fields: ["name", "rating", "formatted_phone_number", "geometry"],
        },
      }
    )
    .then(function (response) {
      console.log("PlaceDetail", response);
    });
};

//Search Near By
const searchNear = () => {
  axios
    .get(
      `${"https://cors-anywhere.herokuapp.com/"}https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          key: api_key,
          location: "40.7601019, -73.9818173",
          radius: 1500,
          type: "restaurant",
        },
      }
    )
    .then(function (response) {
      console.log("searchNear", response);
    });
};

const Google = () => {
  geoData();
  placesData();
  searchNear();

  return (
    <div>
      <h1>Testing Google API</h1>
    </div>
  );
};

export default Google;
