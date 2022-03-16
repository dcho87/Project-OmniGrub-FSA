import axios from "axios";

// INITIAL STATE
const initialState = {
  gRest: [],
};

// ACTION TYPES CONSTANTS
const GET_ALL_REST = "GET_ALL_REST";
const GET_SINGLE_REST = "GET_SINGLE_REST";

// ACTION CREATORS
const _getGoogleRestaurant = (gRest) => ({
  type: GET_ALL_REST,
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
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REST:
      return { ...state, gRest: action.gRest };
    default:
      return state;
  }
};
