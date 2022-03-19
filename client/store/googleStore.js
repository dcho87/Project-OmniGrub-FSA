import axios from "axios";
import { findNearby } from "./yelpSlice";

// ACTION TYPES CONSTANTS
const FIND_SPOTS = "FIND_SPOTS";

// ACTION CREATORS
const _getGoogleRestaurant = (gRest) => ({
  type: FIND_SPOTS,
  gRest,
});

// THUNKS

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

export const reverseGeocode = (lat, lng) => {
  return async (dispatch) => {
    const latlng = lat + "," + lng;
    const geoData = (await axios.get(`/api/google/geocode/reverse/${latlng}`))
      .data;
    const zipcode = geoData.results[0].address_components[6].long_name;
    dispatch(getGoogleRestaurant(zipcode));
    dispatch(findNearby(zipcode));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case FIND_SPOTS:
      return [...state, action.gRest];
    default:
      return state;
  }
};
