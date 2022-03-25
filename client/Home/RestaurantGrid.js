import React from 'react';
import { Box, Typography, Rating, Divider, Drawer, List, ListItem, ListItemText, Chip, IconButton } from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
import LaunchIcon from '@mui/icons-material/Launch';
import { useStyles, FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia } from '../styles';

const RestaurantGrid = ({ restaurants, handleDrawer, isDrawerOpen }) => {
    restaurants = restaurants.currentData();
    const classes = useStyles();
    return(
        <>
            { 
                restaurants.map((restaurant, idx) => {
                    console.log(restaurant)
                    return(
                        <Box 
                            key={idx}
                            className={classes.singleBoxes}
                        >
                            <FiCard 
                                className={classes.card}
                            >
                                <FiCardMedia
                                    media="picture"
                                    alt={restaurant.name}
                                    image={restaurant.image}
                                    title={restaurant.name}
                                />
                                <FiCardContent className={classes.fiCardContent}>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='h2'
                                        onClick={()=>handleDrawer(true, restaurant.id)}
                                        style={{ cursor: 'pointer'}}
                                    >
                                        {restaurant.name} 
                                    </Typography>
                                    <Typography>
                                        {/* Average Rating:  */}
                                        <Rating name="read-only" value={ parseFloat((restaurant.yRating * (restaurant.yTotal / (restaurant.yTotal + restaurant.gTotal)) + restaurant.gRating * (restaurant.gTotal / (restaurant.yTotal + restaurant.gTotal))).toFixed(1)) } precision={0.1} readOnly />
                                        ({ parseFloat((restaurant.yRating * (restaurant.yTotal / (restaurant.yTotal + restaurant.gTotal)) + restaurant.gRating * (restaurant.gTotal / (restaurant.yTotal + restaurant.gTotal))).toFixed(1)) })
                                    </Typography>
                                    <Typography>
                                        {/* {restaurant.category.join(', ')} */}
                                    </Typography>
                                    <Box className={classes.comparison}>
                                        <Typography>
                                            Yelp: {restaurant.yRating}
                                        </Typography>
                                        {/* <Divider orientation="vertical" flexItem></Divider> */}
                                        <span> &nbsp; </span>
                                        <Typography>
                                            Google: {restaurant.gRating}
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
            <Drawer
                anchor='right'
                open={isDrawerOpen.isOpen}
                onClose={()=>handleDrawer(false)}
                BackdropProps={{
                    style: {
                        opacity: 4,
                    }
                }}
                // PaperProps={{
                //     sx: {
                //         backgroundColor: 'rgb(231, 78, 53)',
                //     }
                // }}
                
            >
                <Box
                    p={2} width='300px' textAlign='center' role='presentation'
                    className={classes.slidePanel}
                >
                    <Box
                        component='img'
                        style={{
                            // height: '10vh',
                            width: 'auto'
                        }}
                        src={restaurants[isDrawerOpen.currentIdx]?.image}
                    >
                    </Box>
                    <List>
                        <ListItem className={classes.slidePanelDetails} spacing={1}>
                            <Typography style={{ fontSize: '1.5rem'}}>{restaurants[isDrawerOpen.currentIdx]?.name}</Typography>
                            {/* <ListItemText>{restaurants[isDrawerOpen.currentIdx]?.name}</ListItemText> */}
                            <Typography>
                            {/* <ListItemText> */}
                                Yelp: {restaurants[isDrawerOpen.currentIdx]?.yRating} <span>&nbsp;</span>
                                <Rating name="read-only" value={restaurants[isDrawerOpen.currentIdx]?.yRating} precision={0.1} readOnly />
                                {restaurants[isDrawerOpen.currentIdx]?.yTotal.toLocaleString('en-US')} reviews
                            {/* </ListItemText> */}
                                <IconButton sx={{ p: '2px' }} href={restaurants[isDrawerOpen.currentIdx]?.url}>
                                    <LaunchIcon />
                                </IconButton>
                            </Typography>
                            
                            <Divider variant="middle" />
                            <hr />
                            <Typography>
                            {/* <ListItemText> */}
                                Google: {restaurants[isDrawerOpen.currentIdx]?.gRating} <span>&nbsp;</span>
                                <Rating name="read-only" value={restaurants[isDrawerOpen.currentIdx]?.gRating} precision={0.1} readOnly />
                                ({restaurants[isDrawerOpen.currentIdx]?.gTotal})
                            {/* </ListItemText> */}
                            </Typography>
                            <hr />
                            <Typography>
                                Foursquare: 
                            </Typography>
                            <ListItemText
                                style={{ marginTop: '2rem'}}
                            >
                                {restaurants[isDrawerOpen.currentIdx]?.category.map((c, i)=>{
                                    return(<Chip key={i} label={c} style={{ margin: '0.5rem' }} />)
                                })}
                            </ListItemText>
                        </ListItem>
                    
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default RestaurantGrid
