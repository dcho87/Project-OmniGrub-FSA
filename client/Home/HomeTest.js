import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAllRest } from '../store';
import { Box, Container, Typography, TextField, Grid, Card, CardContent, Paper } from '@mui/material';

// import useStyles from '../styles';

const Home = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    // const classes = useStyles();
    
    const [ restaurants, setRestaurants ] = useState(state.testRest.restaurants);


    useEffect(()=>{
        dispatch(getAllRest())

    }, []);
    // console.log(img);

    useEffect(()=>{
        setRestaurants(state.testRest.restaurants)
    }, [state.testRest.restaurants]);
    // console.log(restaurants)
    const theme = createTheme();

    return(
        <ThemeProvider theme={theme}>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container 
                            maxWidth="sm"
                            // bgcolor="E74E35"
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
                            <TextField 
                                id="outlined-search" 
                                label="Search field" 
                                type="search" 
                            />

                    </Container>
                </Box>
                <Container
                    sx={{ py: 8}} 
                    maxWidth="md"
                >
                    {/* <Grid container spacing={4}>
                        { restaurants.map((restaurant, idx) => {
                            return(
                                <Grid item
                                    key={restaurant.id}
                                    xs={12} sm={6} md={4}
                                >
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
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

                                        </CardContent>
                                    </Card>

                                </Grid> 
                            )
                        })
                        
                        }
                    </Grid> */}

                </Container>
            </main>

        </ThemeProvider>
    )
}

export default Home;