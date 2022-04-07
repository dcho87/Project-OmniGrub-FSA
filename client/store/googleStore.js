import axios from "axios";
import { findNearbyFour } from ".";
import { findNearby } from "./yelpSlice";

// ACTION TYPES CONSTANTS
const GET_ALL_REST = "GET_ALL_REST";
const ADD_REST = "ADD_REST";
const RESET = "RESET";

// ACTION CREATORS
const _getGoogleRestaurant = (gRest) => ({
  type: GET_ALL_REST,
  gRest,
});

const _addRest = (gRest) => ({
  type: ADD_REST,
  gRest,
});

const _reset = (gRest) => ({
  type: RESET,
  gRest,
});

// THUNKS

/*
export const getGoogleRestaurant = (zipcode) => {
  return async (dispatch) => {
    const geoData = await axios.get(`/api/google/geocode/${zipcode}`);
    const { lat, lng } = geoData.data.results[0].geometry.location;
    const location = lat.toString() + "," + lng.toString();
    const restaurants = (await axios.get(`/api/google/searchnear/${location}`))
      .data;
    dispatch(_getGoogleRestaurant(restaurants.results));
  };
};
*/

export const reverseGeocode = (lat, lng) => {
  return async (dispatch) => {
    const latlng = lat + "," + lng;
    const geoData = (await axios.get(`/api/google/geocode/reverse/${latlng}`))
      .data;
    const zipcode = geoData.results[0].address_components[6].long_name;
    dispatch(findNearby(zipcode));
    dispatch(findNearbyFour(zipcode)).then(
      dispatch(getGoogleRestaurant(zipcode))
    );
  };
};

export const searchPlace = (resInfo) => {
  return async (dispatch) => {
    dispatch(_reset(""));
    resInfo.forEach(async (info) => {
      const data = (await axios.put(`/api/google/placedata`, info)).data;
      if (data.status === "OK") {
        dispatch(_addRest(data.results[0]));
        // data.results.forEach((info) => dispatch(_addRest(info)));
      }
    });
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_REST:
      return {};
    // return { ...state, gRest: [action.gRest] };
    case ADD_REST:
      return [...state, action.gRest];
    case RESET:
      return [];
    default:
      return state;
  }
};
