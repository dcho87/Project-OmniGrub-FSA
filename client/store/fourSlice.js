import axios from "axios";

//ACTION TYPES
const FIND_SPOTS_FOUR = "FIND_SPOTS_FOUR";

//ACTION CREATORS
const _findNearbyFour = (nearByFour) => {
  return {
    type: FIND_SPOTS_FOUR,
    nearByFour,
  };
};

//THUNKS
export const findNearbyFour = (zip) => {
  return async (dispatch) => {
    const nearbySpots = (await axios.get(`/api/fourAPI/${zip}`)).data;
    dispatch(_findNearbyFour(nearbySpots));
  };
};

//REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case FIND_SPOTS_FOUR:
      return [action.nearByFour];
    default:
      return state;
  }
};
