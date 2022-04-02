import axios from "axios";
import { useSelector } from "react-redux";

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
export const fetchFavorite = (user) => {
  return async (dispatch) => {
    if (user) {
      const favoriteId = (await axios.get(`/api/favorite/${user.id}`)).data.id;
      const favorite = (await axios.get(`/api/favorite/list/${favoriteId}`))
        .data;
      dispatch(_fetchFavorite(favorite));
    } else {
      return {};
    }
  };
};

export const addToFavorite = (resInfo, user) => {
  return async (dispatch) => {
    let favoriteId = (await axios.get(`/api/favorite/${user.id}`)).data.id;
    const yId = resInfo.yLat.toString().slice(0, 8);
    let list = (await axios.get(`/api/favorite/list/${favoriteId}`)).data;

    //Check if association already exist
    if (list.filter((e) => e.restaurantyId === yId).length) {
      //Remove Favorite
      console.log("removed");
      await axios.put(`/api/favorite/remove/${favoriteId}`, resInfo);

      //Fetch the updated favorite list
      let favorite = (await axios.get(`/api/favorite/list/${favoriteId}`)).data;
      dispatch(_addToFavorite(favorite));
    } else {
      //Add Restaurant Data into DB
      console.log("db added");
      await axios.put(`/api/favorite/${favoriteId}`, resInfo);

      //Fetch the updated favorite list
      let favorite = (await axios.get(`/api/favorite/list/${favoriteId}`)).data;
      dispatch(_addToFavorite(favorite));
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_FAVORITE:
      return action.favorite;
    case ADD_TO_FAVORITE:
      return action.favorite;
    default:
      return state;
  }
};
