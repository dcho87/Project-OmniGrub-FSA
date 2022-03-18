import React from 'react';
import { Box, Container, Typography, TextField, Grid, Card, 
    CardContent, Paper, Rating, FormControl, InputLabel, OutlinedInput,
    IconButton, InputBase, Divider, CardMedia, Chip, Stack, ListItem
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';


const RestaurantGrid = ({ restaurants }) => {
    return(
        <>
            { 
                restaurants.map((restaurant, idx) => {
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
                                    {/* <CardMedia 
                                        component="img"
                                        image='pictures/testPhoto.jpg'
                                        title={restaurant.name}
                                    /> */}
                                    <Typography>
                                        Average Rating: 
                                        <Rating name="read-only" value={restaurant.stars * 1} readOnly />
                                    </Typography>
                                    <Typography>
                                        {/* {restaurant.categories.split(', ').filter(c => c !== 'Restaurants' && c !== 'Food' && c !== 'Food Delivery Services').slice(0, 2).join(', ')} */}
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
                    })
            }
        </>
    )
}

export default RestaurantGrid
