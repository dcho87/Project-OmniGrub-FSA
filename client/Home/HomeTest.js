import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAllRest } from '../store';
import { Box, Container, Typography, TextField, Grid, Card, 
    CardContent, Paper, Rating, FormControl, InputLabel, OutlinedInput,
    IconButton, InputBase, Divider, CardMedia, Chip, Stack, ListItem
} from '@mui/material';
import { useFormControl } from '@mui/material/FormControl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import GoogleIcon from '@mui/icons-material/Google';

const LocationInput = () => {
    return(
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <LocationOnIcon /> 
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Your location... (zipcode, address)"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
            </IconButton> */}
        </Paper>
    )
}
// <Stack direction="column" spacing={1}>
        //     <Chip 
        //         label="Clickable"
        //         // onClick={handleClick}
        //     />
        // </Stack>


        // const useStyles = makeStyles((theme) => ({
        //     root: {
        //       display: "flex",
        //       justifyContent: "left",
        //       flexWrap: "nowrap",
        //       listStyle: "none",
        //       padding: theme.spacing(0.5),
        //       margin: 0,
        //       overflow: "auto",
        //       maxWidth: "400px"
        //     },
        //     chip: {
        //       margin: theme.spacing(0.5)
        //     }
        // }));
const Category = () => {
    const state = useSelector((state) => state);
    const cuisines = ['Asian', 'Burger', 'Pizza', 'Mexican', 'Chinese', 'Thai', 'Japanese', 'Korean', 'American', 'Chicken', 'Indian', 'Healthy', 'Salads', 'Vegen', 'Italian', 'Breakfast & Brunch', 'Diner', 'Desserts', 'Fast Food', 'Bubble Tea', 'Bakery', 'Vietnamese', 'Poke', 'African', 'Ramen', 'Sushi', 'Jamaican', 'BBQ', 'Soup', 'Coffee & Tea', 'Sandwich']
    const [ categories, setCategories ] = useState(cuisines)
    // console.log(categories)
    return(
        <Paper 
            component="ul"
            style={{ 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'auto',
                maxHeight: '400px',
                maxWidth: '200px'
            }}
        >
            { cuisines.map((cuisine, idx) => {
                return (
                <ListItem key={idx}>
                    <Chip
                        label={cuisine}
                        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                        
                    />
                </ListItem>
                );
            })}

        </Paper>
    )
}

const HomeTest = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    // const classes = useStyles();
    
    const [ restaurants, setRestaurants ] = useState(state.testRest.restaurants);
    
    useEffect(()=>{
        dispatch(getAllRest())
    }, []);

    useEffect(()=>{
        setRestaurants(state.testRest.restaurants)
    }, [state.testRest.restaurants]);

    const categories = [...new Set(state.testRest.restaurants.map((restaurant) => restaurant.categories))]
    const cleanedCat = categories.map((restCat) => restCat.split(', ').filter(c => c !== 'Restaurants' && c !== 'Food').slice(0, 2)).join(', ')
    
    const theme = createTheme();

    return(
        <ThemeProvider theme={theme}>
            <main>
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
                                Welcome to OmniGrub
                            </Typography>
                            
                            <LocationInput/>

                    </Container>
                </Box>
                <Paper
                    style={{ 
                        display: 'flex', 
                        overflow: 'auto',
                        // maxHeight: '400px',
                        // maxWidth: '1000px'
                        padding: '2rem'
                    }}
                >
                    <Category />
                    <Container
                        // sx={{ py: 8}} 
                        maxWidth="md"
                    >
                        <Grid container spacing={4}>
                            { restaurants.map((restaurant, idx) => {
                                return(
                                    <Grid item
                                        key={restaurant.id}
                                        xs={12} sm={6} md={4}
                                    >
                                        <Card
                                            // sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                                        >
                                            <CardContent
                                                sx={{ flexGrow: 1}}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant='h5'
                                                    component='h2'
                                                >
                                                    {restaurant.name} 
                                                </Typography>
                                                <CardMedia 
                                                    component="img"
                                                    image='pictures/testPhoto.jpg'
                                                    title={restaurant.name}
                                                />
                                                <Typography>
                                                    Average Rating: 
                                                    <Rating name="read-only" value={restaurant.stars * 1} readOnly />
                                                </Typography>
                                                <Typography>
                                                    {restaurant.categories.split(', ').filter(c => c !== 'Restaurants' && c !== 'Food' && c !== 'Food Delivery Services').slice(0, 2).join(', ')}
                                                </Typography>
                                                <Typography>
                                                    reviews: 
                                                    <IconButton sx={{ p: '1px' }}>
                                                        <Box
                                                            component="img"
                                                            style={{
                                                                height: '2vh',
                                                                // width: 'auto'
                                                            }}
                                                            src='pictures/yelp_Logo.png'
                                                        />
                                                        ({restaurant.reviewCounts}) 
                                                    </IconButton>
                                                    <span>&nbsp;</span>
                                                    <IconButton sx={{ p: '1px' }}>
                                                        <GoogleIcon /> ({Math.floor(Math.random() * 100)})
                                                    </IconButton>
                                                </Typography>

                                            </CardContent>
                                        </Card>

                                    </Grid> 
                                )
                                })}
                        </Grid>

                    </Container>

                </Paper>
            </main>

        </ThemeProvider>
    )
}

export default HomeTest;