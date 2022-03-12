import axios from 'axios';

// INITIAL STATE
const initialState = {
    restaurants: [],
    restaurant: {}
}

// ACTION TYPES CONSTANTS
const GET_ALL_REST = "GET_ALL_REST"
const GET_SINGLE_REST = "GET_SINGLE_REST"

// ACTION CREATORS
const _getAllRest = (rests) => ({ type: GET_ALL_REST, restaurants })
const _getSingleRest = (rest) => ({ type: GET_SINGLE_REST, restaurant })

// THUNKS
export const getAllRest = () => {
    return async (dispatch) => {
        const restaurants = (await axios.get('/api/testRest')).data
        dispatch(_getAllRest)
    }
}

// haven't set up single restaurant api route

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REST:
            return { ...state, restaurants: action.restaurants }
        default: 
            return state
    }
}

