import axios from "axios";

// ACTION TYPES CONSTANTS
const FETCH_FAVORITE = "FETCH_FAVORITE";
const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";

// ACTION CREATORS
const _fetchFavorite = (favorite) => ({
  type: FETCH_FAVORITE,
  favorite,
});

const _addToFavorite = (favorite) => ({
  type: ADD_TO_FAVORITE,
  favorite,
});

// THUNKS
export const fetchFavorite = () => {
  return async (dispatch) => {
    const user = (await axios.get("/auth/me")).data;
    const favorite = (await axios.get(`/favorite/${user.id}`)).data;
    dispatch(_fetchFavorite(favorite));
  };
};

export const addToFavorite = (resInfo) => {
  return async (dispatch) => {
    const user = (await axios.get("/auth/me")).data;
    let favorite = (await axios.get(`/favorite/${user.id}`)).data;

    //Add Restaurant Data into DB
    await axios.post("/api/favorite", resInfo);

    //Add Restaurant to Favorite
    await axios.put(`/api/favorite/${favorite.id}`, resInfo);

    //Fetch the updated favorite list
    favorite = (await axios.get(`/favorite/${user.id}`)).data;

    dispatch(_addToFavorite(favorite));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_FAVORITE:
      return [...state, action.favorite];
    case ADD_TO_FAVORITE:
      return [...state, action.favorite];
    default:
      return state;
  }
};
