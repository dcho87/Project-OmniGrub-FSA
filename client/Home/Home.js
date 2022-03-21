import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRest, getGoogleRestaurant, reverseGeocode, findNearby } from '../store';
import { Box, Container, Typography, Paper, Pagination } from '@mui/material';
import { useStyles } from '../styles';
import LocationInput from './LocationInput';
import Category from './Category';
import RestaurantGrid from './RestaurantGrid';
import usePagination from './Pagination';

const Home = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const classes = useStyles();
    // STATES
    const [ loadedY, setLoadedY ] = useState(false);
    const [ loadedG, setLoadedG ] = useState(false);
    const [ restaurantsY, setRestaurantsY ] = useState([]);
    const [ restaurantsG, setRestaurantsG ] = useState([]);
    const [ totalRests, setTotalRests ] = useState([]);
    // LOCATION
    const [ zip, setZip ] = useState("");
    // PAGINATION
    let [ page, setPage ] = useState(1);
    const countPerPage = 7;
    const count = Math.ceil(totalRests.length / countPerPage)
    const _totalRests = usePagination(totalRests, count)
    // CATEGORY & CUISINE
    const cuisines = ['Show All', 'Asian', 'Burgers', 'Pizza', 'Mexican', 'Chinese', 'Thai', 'Japanese', 'Korean', 'American', 'Chicken', 'Indian', 'Healthy', 'Salads', 'Vegen', 'Italian', 'Breakfast & Brunch', 'Diner', 'Desserts', 'Fast Food', 'Bubble Tea', 'Bakery', 'Vietnamese', 'Poke', 'African', 'Ramen', 'Sushi', 'Jamaican', 'BBQ', 'Soup', 'Coffee & Tea', 'Sandwich']
    const [ category, setCategory ] = useState(cuisines);
    const [ filtered, setFiltered ] = useState(false);
    // ZIPCODE LOCATION
    const onChange = (ev) => {
        setZip({ ...zip, zip: ev.target.value });
    };
    const onSubmit = (ev) => {
        ev.preventDefault();
        try {
            dispatch(findNearby(zip.zip)).then(() => {
                setRestaurantsY(state.yelpSlice[0]);
                setLoadedY(true);
              })
            dispatch(getGoogleRestaurant(zip.zip)).then(()=>{
                setRestaurantsG(state.googleStore.gRest);
                setLoadedG(true);
            });
        } catch (error) {
            console.log(error);
        }
    };
    // YELP SETSTATE
    useEffect(()=>{
        try{
            if(loadedY){
                const cleanYelp = [...state.yelpSlice[0].businesses].map((e)=>{
                    return {
                        name: e.name,
                        yRating: e.rating,
                        yLat: e.coordinates.latitude,
                        image: e.image_url,
                        yTotal: e.review_count,
                        category: e.categories.map(c => c.title),
                        url: e.url,
                    }
                })
                setRestaurantsY(cleanYelp);
            }
        } catch(e){
            console.log(e)
        }
    }, [loadedY, state.yelpSlice[0]])
    const combineArr = (arr1, arr2) => {
        return arr1.map((e) => {
            arr2.forEach((x) => {
                if( x.name === e.name ){
                    e.gRating = x.gRating;
                    e.gLat = x.gLat;
                    e.gTotal = x.gTotal;
                    e.gId = x.gId;
                } else {
                    e.gRating = e.gRating > 0 ? e.gRating : 0;
                    e.gTotal = e.gTotal > 0 ? e.gTotal : 0;
                }
            })
            return e
        })
    }
    // GOOGLE SETSTATE, BOTH DATA
    useEffect(()=>{
        try{
            if(loadedG){
                const cleanGoog = [...state.googleStore.gRest].map((e) => {
                    return {
                        name: e.name,
                        gRating: e.rating,
                        gLat: e.geometry.location.lat,
                        gTotal: e.user_ratings_total,
                        gId: e.place_id,
                    }
                }) 
                setRestaurantsG(cleanGoog);
                const combined = combineArr(restaurantsY, cleanGoog)
                setTotalRests(combined);
            }
        } catch(e){
            console.log(e)
        }
    }, [loadedG, state.googleStore])
    // FILTERING 
    const handleFilter = (ev) => {
        let newCuisine = ev.target.textContent;
        setCategory(newCuisine);
        let newRestList = combineArr(restaurantsY, restaurantsG);
        if(newCuisine === 'Show All') {
            setTotalRests(newRestList)
        } else if (category) {
            newRestList = newRestList.filter(r => r.category.includes(newCuisine));
            setTotalRests(newRestList)
        }
        setFiltered(true)
    }
    // PAGINATE
    const changePage = (e, p) => {
        setPage(p)
        _totalRests.jump(p)
    }
    // GETTING USER'S LOCATION
    function getPosition() {
        return new Promise((success) =>
            navigator.geolocation.getCurrentPosition(success)
        );
    }
    async function geoCode() {
        const p = await getPosition();
        dispatch(reverseGeocode(p.coords.latitude, p.coords.longitude));
    }
    return(
        <main className={classes.root}>
            <Box sx={{ bgcolor: '#FFF', pt: 8, pb: 6 }}>
                <Container maxWidth="sm" className={classes.hero}>
                    <Typography
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Your views to all reviews
                    </Typography>
                    <LocationInput zip={zip} onChange={onChange} onSubmit={onSubmit} geoCode={geoCode} />
                </Container>
                <Paper className={classes.containerBoth}>
                    <Category cuisines={cuisines} handleFilter={handleFilter} />
                    { totalRests ? <RestaurantGrid restaurants={_totalRests} /> : 'Loading...' }
                </Paper>
                <Pagination
                    className={classes.pagination}
                    count={count}
                    size="large"
                    page={page}
                    onChange={changePage}
                />
            </Box>
        </main>
    )
}

export default Home