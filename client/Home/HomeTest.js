import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAllRest } from '../store';
import { Box, Container, Typography, TextField, Grid, Card, 
    CardContent, Paper, Rating, FormControl, InputLabel, OutlinedInput,
    IconButton, InputBase, Divider, CardMedia, Chip, Stack, ListItem, Pagination
} from '@mui/material';
// import { useFormControl } from '@mui/material/FormControl';
import RestaurantGrid from './RestaurantGrid';
import Category from './Category';
import LocationInput from './LocationInput';
import usePagination from './Pagination';
import { useStyles } from '../styles';

const HomeTest = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const classes = useStyles();
    
    const [ restaurants, setRestaurants ] = useState(state.testRest.restaurants);
    // PAGINATION
    let [page, setPage] = useState(1);
    const countPerPage = 7;
    const count = Math.ceil(restaurants.length / countPerPage)
    const _restaurants = usePagination(restaurants, count)
    // FILTER LIST
    const cuisines = ['Asian', 'Burgers', 'Pizza', 'Mexican', 'Chinese', 'Thai', 'Japanese', 'Korean', 'American', 'Chicken', 'Indian', 'Healthy', 'Salads', 'Vegen', 'Italian', 'Breakfast & Brunch', 'Diner', 'Desserts', 'Fast Food', 'Bubble Tea', 'Bakery', 'Vietnamese', 'Poke', 'African', 'Ramen', 'Sushi', 'Jamaican', 'BBQ', 'Soup', 'Coffee & Tea', 'Sandwich']
    const [ category, setCategory ] = useState(cuisines);
    const [ filtered, setFiltered ] = useState(false);
    
    useEffect(()=>{
        dispatch(getAllRest())
    }, []);

    useEffect(()=>{
        setRestaurants(state.testRest.restaurants)
    }, [state.testRest.restaurants]);

    const cuisinesDisplay = [...new Set(state.testRest.restaurants.map((restaurant) => restaurant.categories))]
    const cleanedCat = cuisinesDisplay.map((restCat) => restCat.split(', ').filter(c => c !== 'Restaurants' && c !== 'Food').slice(0, 2)).join(', ')
    
    // FILTERING
    const handleFilter = (ev) => {
        // filtered ? setRestaurants(state.testRest.restaurants) : ''
        // console.log(ev)
        let newCuisine = ev.target.textContent;
        setCategory(newCuisine)
        // console.log(category)
        // console.log(ev.target.textContent)
        let newRestList = [...state.testRest.restaurants]
        if(newCuisine) {
            newRestList = newRestList.filter((restaurant) => {
                // console.log(newRestList.length);
                return restaurant.categories.includes(newCuisine)
            })
            // console.log(newRestList.length)
        }
        setRestaurants(newRestList)
        setFiltered(true)
        // console.log(restaurants.length)
    }
    // const theme = createTheme();
    
    // PAGINATE
    const changePage = (e, p) => {
        setPage(p)
        _restaurants.jump(p)
    }

    return(
        // <ThemeProvider theme={theme}>
            <main className={classes.root}>
                <Box 
                    sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}
                    
                >
                    <Container 
                        maxWidth="sm" 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                            {/* <Box
                                component="img"
                                sx={{
                                    height: '20%',
                                    // width: 'auto'
                                }}
                                src='OmniGrub-logos.jpeg'
                            /> */}
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Your views to all reviews
                            </Typography>
                            
                            <LocationInput/>

                    </Container>

                </Box>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={changePage}
                />
                <Paper className={classes.containerBoth}>
                    <Category cuisines={cuisines} handleFilter={handleFilter} />
                    <RestaurantGrid 
                        // restaurants={restaurants} 
                        restaurants={_restaurants} 
                    /> 
                </Paper>
                
            </main>

        // </ThemeProvider>
    )
}

export default HomeTest;