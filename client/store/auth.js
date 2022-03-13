import axios from 'axios'

const TOKEN = "token";

//ACTION TYPES
const SET_AUTH = "SET_AUTH"
const UPDATE_USER = "UPDATE_USER"

//ACTION CREATORS
const setAuth = (auth)=>({type: SET_AUTH, auth})
const updateUser = (user)=>({type: UPDATE_USER, user})

//THUNK CREATORS

//method in this case is login, so calls auth/login
//auth/login calls the user.authenticate method using the login information set up in an object {email: "email", password:"password"}
//first it looks for an email, if it finds an email then it does bcrypt compare on the password
//if both are true, then it calls generateToken to create a token for the users session using jwt.sign, which is associated to the UserId
//dispatches the "Me" thunk
export const authenticate = (data, method)=> async(dispatch)=>{
    try{
        const response = await axios.post(`/auth/${method}`, {data})
        window.localStorage.setItem(TOKEN, response.data.token);
        dispatch(me());
    }catch(error){
        return dispatch(setAuth({error:error}))
    }
}

export const me = () => async(dispatch)=>{
    //checks if token is in local storage
    const token = window.localStorage.getItem(TOKEN);
    if(token){
        //if token is in local storage, call the route for auth/me which calls FindByToken method
        //findbytoken method searches database for a token associated with a userId, then pulls the userId to send back the user
        const response = await axios.get("/auth/me", {
            headers:{
                authorization: token,
            },
        });
        return dispatch(setAuth(response.data))
    }
}

//pretty simple, just calls setauth with an empty object and removes the token from localstorage
export const logout = ()=>(dispatch)=>{
    dispatch(setAuth({}));
    window.localStorage.removeItem(TOKEN)
};

//REDUCER
export default function (state = {}, action){
    switch(action.type){
        case SET_AUTH:
            return action.auth;
        default:
            return state;
    }
}