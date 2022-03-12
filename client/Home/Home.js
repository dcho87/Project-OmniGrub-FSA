import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRest } from '../store';

const Home = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    // console.log(state);
    
    // const [ restaurants, setRestaurants ] = useState(state.restaurants);
    useEffect(()=>{
        dispatch(getAllRest())
        // setRestaurants(state.restaurants)
    }, []);
    // console.log(restaurants);
    return(
        <div>
            <h2>Something</h2>
        </div>
    )
}

export default Home;