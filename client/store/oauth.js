import axios from "axios";

const TOKEN = "token";

//ACTION TYPES
const NOT_FOUND = "NOT_FOUND"

//ACTION CREATORS
const notFound = (notFound)=>({type:NOT_FOUND,notFound})

//THUNK CREATORS
export const exists = (googleId) => async (dispatch) => {
  try {
    const user = await (axios.get(`/auth/exists/${googleId}`))
    console.log("THIS IS USERRRRR", user.data.user)
    if(user.data.user === false){
        dispatch(notFound(user.data))
    } else{
        dispatch(notFound({user:true}))
    }
  } catch (ex) {
    console.log(ex);
  }
};
//finish writing exists thunk, will return null often, make sure that is accounted for
//if the response is null then that, otherwise that

//REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case NOT_FOUND:
        return action.notFound;
    default:
      return state;
  }
}
