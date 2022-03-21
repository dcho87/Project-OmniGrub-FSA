import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAllRest, getGoogleRestaurant, reverseGeocode, findNearby } from '../store';
import { Box, Container, Typography, Paper, Pagination } from '@mui/material';
import RestaurantGrid from './RestaurantGrid';
import Category from './Category';
import LocationInput from './LocationInput';
import usePagination from './Pagination';
import { useStyles } from '../styles';

const HomeTest = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log(state);
    const classes = useStyles();
    // const theme = createTheme();
    const [ restaurants, setRestaurants ] = useState(state.testRest.restaurants);
    // YELP, GOOGLE API
    const [ zipcode, setZipcode ] = useState("");
    const [ zip, setZip ] = useState("");

    // PAGINATION
    let [ page, setPage ] = useState(1);
    const countPerPage = 7;
    const count = Math.ceil(restaurants.length / countPerPage)
    const _restaurants = usePagination(restaurants, count)
    // FILTER LIST
    const cuisines = ['Asian', 'Burgers', 'Pizza', 'Mexican', 'Chinese', 'Thai', 'Japanese', 'Korean', 'American', 'Chicken', 'Indian', 'Healthy', 'Salads', 'Vegen', 'Italian', 'Breakfast & Brunch', 'Diner', 'Desserts', 'Fast Food', 'Bubble Tea', 'Bakery', 'Vietnamese', 'Poke', 'African', 'Ramen', 'Sushi', 'Jamaican', 'BBQ', 'Soup', 'Coffee & Tea', 'Sandwich']
    const [ category, setCategory ] = useState(cuisines);
    const [ filtered, setFiltered ] = useState(false);
    // LOCATION KENNETH
    const onChange = (ev) => {
        setZip({ ...zip, zip: ev.target.value });
        // setZipcode(ev.target.value);
    };
    
    const onSubmit = (ev) => {
        console.log('in submit')
        ev.preventDefault();
        try {
            console.log('ready to find nearby')
            dispatch(findNearby(zip.zip));
            // dispatch(getGoogleRestaurant(zip.zip));
            // dispatch(getGoogleRestaurant(zipcode));
            // dispatch(findNearby(zipcode));
        } catch (error) {
            console.log(error);
        }
    };
    
    // STATE DISPATCH
    useEffect(()=>{
        dispatch(getAllRest())
    }, []);
    // SETTING RESTAURANT STATE
    useEffect(()=>{
        setRestaurants(state.testRest.restaurants)
    }, [state.testRest.restaurants]);

    const cuisinesDisplay = [...new Set(state.testRest.restaurants.map((restaurant) => restaurant.categories))]
    const cleanedCat = cuisinesDisplay.map((restCat) => restCat.split(', ').filter(c => c !== 'Restaurants' && c !== 'Food').slice(0, 2)).join(', ')
    
    // FILTERING
    const handleFilter = (ev) => {
        // filtered ? setRestaurants(state.testRest.restaurants) : ''
        let newCuisine = ev.target.textContent;
        setCategory(newCuisine)
        let newRestList = [...state.testRest.restaurants]
        if(newCuisine) {
            newRestList = newRestList.filter((restaurant) => {
                return restaurant.categories.includes(newCuisine)
            })
        }
        setRestaurants(newRestList)
        setFiltered(true)
    }
    // PAGINATE
    const changePage = (e, p) => {
        setPage(p)
        _restaurants.jump(p)
    }
    // LOCATION DANIEL
    function getPosition() {
        return new Promise((success) =>
            navigator.geolocation.getCurrentPosition(success)
        );
    }
    async function geoCode() {
        const p = await getPosition();
        dispatch(reverseGeocode(p.coords.latitude, p.coords.longitude));
    }
    // FROM HOMEYELP
    let currentSpots = [];
    //Loads Yelp array first while waiting for Google array to load
    if (state.yelpSlice[0])
        currentSpots = state.yelpSlice[0].businesses
        .map((e) => {
            return {
                name: e.name,
                yRating: e.rating,
                yLat: e.coordinates.latitude,
                image: e.image_url,
                yTotal: e.review_count,
            };
        })
    
    //Loads both once Google array is loaded
    if (state.yelpSlice[0] && state.googleStore.gRest) {
        const yelpArray = state.yelpSlice[0].businesses;
        const googArray = state.googleStore.gRest;
        //Grab attributes you want from yelp here
        const cleanYelp = yelpArray.map((e) => {
        return {
            name: e.name,
            yRating: e.rating,
            yLat: e.coordinates.latitude,
            image: e.image_url,
            yTotal: e.review_count,
        };
        });
    //Grab attributes you want from Google here
    const cleanGoogle = googArray.map((e) => {
        return {
          name: e.name,
          Googlerating: e.rating,
          lat: e.geometry.location.lat,
          gTotal: e.user_ratings_total,
          gId: e.place_id,
        };
      });
    //Merge the two arrays together
    const combined = cleanYelp
        .map((e) => {
            cleanGoogle.forEach((x) => {
                if (x.name === e.name) {
                    e.gRating = x.Googlerating;
                    e.gLat = x.lat;
                    e.gTotal = x.gTotal;
                    e.gId = x.gId;
                } else {
                    e.gRating = e.gRating > 0 ? e.gRating : 0;
                    e.gTotal = e.gTotal > 0 ? e.gTotal : 0;
                }
            });
            return e;
        })
        currentSpots = combined;
    }
    
    return(
        // <ThemeProvider theme={theme}>
            <main className={classes.root}>
                <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
                    <Container 
                        maxWidth="sm" 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Your views to all reviews
                            </Typography>
                            
                            <LocationInput zip={zip} geoCode={geoCode} onChange={onChange} onClick={onSubmit} />

                    </Container>
                </Box>
                    
                <Paper className={classes.containerBoth}>
                    <Category cuisines={cuisines} handleFilter={handleFilter} />
                    <RestaurantGrid restaurants={_restaurants} /> 
                </Paper>
                <Pagination
                    className={classes.pagination}
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={changePage}
                />
            </main>

        // </ThemeProvider>
    )
}

export default HomeTest;

{/* <Box
    component="img"
    sx={{
        height: '20%',
        // width: 'auto'
    }}
    src='OmniGrub-logos.jpeg'
/> */}