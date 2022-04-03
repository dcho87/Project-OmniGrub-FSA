import axios from "axios";
import { searchPlace } from ".";

//ACTION TYPES
const FIND_SPOTS = "FIND_SPOTS";

//ACTION CREATORS
const _findNearby = (nearBySpots) => {
  return {
    type: FIND_SPOTS,
    nearBySpots,
  };
};

//THUNKS
export const findNearby = (zip) => {
  return async (dispatch) => {
    const nearbySpots = (await axios.get(`/api/yelpAPI/${zip}`)).data;
    dispatch(searchPlace(nearbySpots.businesses));
    dispatch(_findNearby(nearbySpots));
  };
};

//REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case FIND_SPOTS:
      return [action.nearBySpots];
    default:
      return state;
  }
};
