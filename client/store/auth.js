import axios from "axios";
import { fetchFavorite, setflashMessage } from ".";

const TOKEN = "token";

//ACTION TYPES
const SET_AUTH = "SET_AUTH";
const UPDATE_USER = "UPDATE_USER";

//ACTION CREATORS
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const upUser = (user) => ({ type: UPDATE_USER, user });

//THUNK CREATORS

//method in this case is login or signup
//auth/login calls the user.authenticate method using the login information set up in an object {email: "email", password:"password"}
//first it looks for an email, if it finds an email then it does bcrypt compare on the password
//if both are true, then it calls generateToken to create a token for the users session using jwt.sign, which is associated to the UserId
//dispatches the "Me" thunk
export const authenticate = (data, method) => async (dispatch) => {
  try {
    const response = await axios.post(`/auth/${method}`, { data });
    window.localStorage.setItem(TOKEN, response.data.token);
    dispatch(me());
  } catch (error) {
    //displays the auth error in the logger
    return dispatch(setAuth({ error: error }));
  }
};

export const authenticateGoog = (data, method) => async (dispatch) => {
  try {
    const response = await axios.post(`/auth/${method}/google`, { data });
    window.localStorage.setItem(TOKEN, response.data.token);
    dispatch(me());
  } catch (error) {
    //displays the auth error in the logger
    return dispatch(setAuth({ error: error }));
  }
};

export const me = () => async (dispatch) => {
  //checks if token is in local storage
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    //if token is in local storage, call the route for auth/me which calls FindByToken method
    //findbytoken method decodes the token, then pulls the userId to send back the user
    const response = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    dispatch(fetchFavorite(response.data));
    return dispatch(setAuth(response.data));
  }
};

export const oauth = (data) => async (dispatch) => {
  try {
    const user = await axios.get(`/auth/exists/${data.googleId}`);
    console.log("THIS IS DATAAAAAA", data);
    console.log("THIS IS USERRRRR", user);
    if (user.data.user === false) {
      await dispatch(authenticate(data, "signup")).then(() => {
        dispatch(setflashMessage(true, "success", "Welcome to OmniGrub!"));
      });
    } else if (user.data.user === true) {
      await dispatch(authenticateGoog(data, "login")).then(() => {
        dispatch(setflashMessage(true, "success", "Welcome back!"));
      });
    }
  } catch (ex) {
    console.log(ex);
  }
};
//pretty simple, just calls setauth with an empty object and removes the token from localstorage
export const logout = () => (dispatch) => {
  dispatch(setAuth({}));
  window.localStorage.removeItem(TOKEN);
};


export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const newUser = (await axios.put(`/api/users/${user.id}`, user)).data;
      dispatch(upUser(newUser));
    } catch (err) {
      console.log(err);
    }
  };
};

//REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
