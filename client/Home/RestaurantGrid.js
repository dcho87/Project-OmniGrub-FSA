import React from 'react';
import { Box, Typography, Rating, Divider } from '@mui/material';
import { makeStyles } from '@material-ui/core'
import GoogleIcon from '@mui/icons-material/Google';
import { useStyles, FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia } from '../styles';

const RestaurantGrid = ({ restaurants }) => {
    restaurants = restaurants.currentData();
    const classes = useStyles();
    const googleReviews = Math.floor(Math.random() * 100)
    const googleRating = Math.floor(Math.random() * 5)
    return(
        <>
            { 
                restaurants.map((restaurant) => {
                    return(
                        <Box 
                            key={restaurant.id}
                            className={classes.singleBoxes}
                        >
                            <FiCard
                                className={classes.card}
                            >
                                <FiCardMedia
                                    media="picture"
                                    alt={restaurant.name}
                                    image='pictures/testPhoto.jpg'
                                    title={restaurant.name}
                                />
                                <FiCardContent
                                    className={classes.fiCardContent}
                                >
                                    <Typography
                                            gutterBottom
                                            variant='h5'
                                            component='h2'
                                    >
                                        {restaurant.name} 
                                    </Typography>
                                    <Typography>
                                        {/* Average Rating:  */}
                                        <Rating name="read-only" value={ parseFloat(((restaurant.stars * 1 * restaurant.reviewCounts/(restaurant.reviewCounts + googleReviews)) + (googleRating * googleReviews/(restaurant.reviewCounts + googleReviews))).toFixed(1))} readOnly />
                                        ({ parseFloat(((restaurant.stars * 1 * restaurant.reviewCounts/(restaurant.reviewCounts + googleReviews)) + (googleRating * googleReviews/(restaurant.reviewCounts + googleReviews))).toFixed(1))})
                                    </Typography>
                                    <Typography>
                                        {restaurant.categories.split(', ').filter(c => c !== 'Restaurants' && c !== 'Food' && c !== 'Food Delivery Services').slice(0, 2).join(', ')}
                                    </Typography>
                                    <Box className={classes.comparison}>
                                        <Typography>
                                            Yelp: 
                                        </Typography>
                                        <Divider orientation="vertical" flexItem></Divider>
                                        <Typography>
                                            Google:
                                        </Typography>
                                    </Box>
                                    {/* <Typography> */}
                                        {/* <IconButton sx={{ p: '1px' }}>
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
                                            <GoogleIcon /> ({googleReviews})
                                        </IconButton> */}
                                    {/* </Typography> */}
                                </FiCardContent>
                            </FiCard>
                        </Box>
                    )
                    })
            }
        </>
    )
}

export default RestaurantGrid
