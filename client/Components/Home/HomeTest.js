import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAllRest, getGoogleRestaurant, reverseGeocode, findNearby } from '../../store';
import { Box, Container, Typography, Paper, Pagination } from '@mui/material';
import RestaurantGrid from './RestaurantGrid';
import Category from './Category';
import LocationInput from './LocationInput';
import usePagination from './Pagination';
import { useStyles } from '../styles';

const HomeTest = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const classes = useStyles();
    // const theme = createTheme();
    const [ restaurants, setRestaurants ] = useState(state.testRest.restaurants);
    // PAGINATION
    let [ page, setPage ] = useState(1);
    const countPerPage = 7;
    const count = Math.ceil(restaurants.length / countPerPage)
    const _restaurants = usePagination(restaurants, count)
    // FILTER LIST
    const cuisines = ['Asian', 'Burgers', 'Pizza', 'Mexican', 'Chinese', 'Thai', 'Japanese', 'Korean', 'American', 'Chicken', 'Indian', 'Healthy', 'Salads', 'Vegen', 'Italian', 'Breakfast & Brunch', 'Diner', 'Desserts', 'Fast Food', 'Bubble Tea', 'Bakery', 'Vietnamese', 'French', 'Spanish', 'Taiwanese', 'Poke', 'African', 'Ramen', 'Sushi', 'BBQ', 'Soup', 'Coffee & Tea', 'Sandwich', 'Smoothy', 'Kosher', 'Soul Food', 'Brazilian', 'Comfort Food', 'Greek', 'Portuguese', 'Dominican', 'Wings', 'Barfood', 'Turkish', 'Alcohol']
    const [ category, setCategory ] = useState(cuisines);
    const [ filtered, setFiltered ] = useState(false);
    const [ isDrawerOpen, setIsDrawerOpen ] = useState({
        isOpen: false,
        currentIdx: 0
    });
    // HANDLE DRAWER
    const handleDrawer = (openBool, id) => {
        setIsDrawerOpen({
            isOpen: openBool,
            currentIdx: id
        })
    }
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
        if(newCuisine) newRestList = newRestList.filter((restaurant) => restaurant.categories.includes(newCuisine))
        setRestaurants(newRestList)
        setFiltered(true)
    }
    // PAGINATE
    const changePage = (e, p) => {
        setPage(p)
        _restaurants.jump(p)
    }
    return(
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
                            
                            {/* <LocationInput zip={zip} geoCode={geoCode} onChange={onChange} onClick={onSubmit} /> */}

                    </Container>
                </Box>
                    
                <Paper className={classes.containerBoth}>
                    <Category cuisines={cuisines} handleFilter={handleFilter} />
                    <RestaurantGrid restaurants={_restaurants} setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer}/> 
                </Paper>
                <Pagination
                    className={classes.pagination}
                    count={count}
                    size="large"
                    page={page}
                    // variant="outlined"
                    // shape="rounded"
                    onChange={changePage}
                />
            </main>
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
