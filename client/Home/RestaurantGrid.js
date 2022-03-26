import React from 'react';
import { useDispatch } from "react-redux";
import { addToFavorite } from "../store";
import { Box, Typography, Rating, Divider, Drawer, List, ListItem, ListItemText, Chip, Avatar, IconButton } from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';
import { useStyles, FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia } from '../styles';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const RestaurantGrid = ({ restaurants, totalRests, handleDrawer, isDrawerOpen }) => {
    restaurants = restaurants.currentData();
    const classes = useStyles();
  const dispatch = useDispatch();

  const onClick = (restaurant, user) => {
    dispatch(addToFavorite(restaurant, user));
  };
    
    const classes = useStyles();
    return(
        <>
            { 
                restaurants.map((restaurant, idx) => {
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
                                                  <FavoriteBorderIcon
                  onClick={() => {
                    onClick(restaurant, user);
                  }}
                />
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='h2'
                                        onClick={()=>handleDrawer(true, restaurant.id)}
                                        style={{ cursor: 'pointer'}}
                                    >
                                        {restaurant.name} 
                                    </Typography>
                                    <Typography className={classes.ratingTextOmni}>
                                        {/* Average Rating:  */}
                                        OmniGrub: 
                                        <span>&nbsp;</span>
                                        { parseFloat((restaurant.yRating * (restaurant.yTotal / (restaurant.yTotal + restaurant.gTotal)) + restaurant.gRating * (restaurant.gTotal / (restaurant.yTotal + restaurant.gTotal))).toFixed(1)) }
                                        <span>&nbsp;</span>
                                        <Rating name="read-only" value={ parseFloat((restaurant.yRating * (restaurant.yTotal / (restaurant.yTotal + restaurant.gTotal)) + restaurant.gRating * (restaurant.gTotal / (restaurant.yTotal + restaurant.gTotal))).toFixed(1)) } precision={0.1} readOnly />
                                    </Typography>
                                    <Typography>
                                        {/* {restaurant.category.join(', ')} */}
                                    </Typography>
                                    {/* <hr /> */}
                                    <Divider variant="middle"/>
                                    <Box className={classes.comparison}>
                                        <Typography className={classes.ratingText}>
                                            Yelp: {restaurant.yRating}
                                            <span>&nbsp;</span>
                                            <StarIcon />
                                            {/* <img src={`/pictures/small_${restaurant.yRating}.png`} /> */}
                                            {/* <Rating name="read-only" value={restaurant.yRating} precision={0.1} readOnly /> */}
                                            <span>&nbsp;</span>
                                            {/* ({restaurant.yTotal.toLocaleString('en-US')}) */}
                                        </Typography>
                                        
                                        {/* <span> &nbsp; </span> */}
                                        <Typography className={classes.ratingText}>
                                            Google: {restaurant.gRating}
                                            <span> &nbsp; </span>
                                            <StarIcon />
                                            {/* <Rating name="read-only" value={restaurant.gRating} precision={0.1} readOnly /> */}
                                            <span>&nbsp;</span>
                                            {/* ({restaurant.gTotal.toLocaleString('en-US')}) */}
                                        </Typography>
                                        <Typography className={classes.ratingText}>
                                            Foursquare: 
                                            <span> &nbsp; </span>
                                            {/* <Rating name="read-only" value={restaurant.gRating} precision={0.1} readOnly /> */}
                                            {/* <span>&nbsp;</span> */}
                                            {/* ({restaurant.gTotal.toLocaleString('en-US')}) */}
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
                        src={totalRests[isDrawerOpen.currentIdx]?.image}
                    >
                    </Box>
                    <List>
                        <ListItem className={classes.slidePanelDetails} spacing={1}>
                            {/* <Typography>
                                OmniGrub: 
                                <span>&nbsp;</span>
                                { parseFloat((restaurants[isDrawerOpen.currentIdx]?.yRating * ([isDrawerOpen.currentIdx]?.yTotal / ([isDrawerOpen.currentIdx]?.yTotal + [isDrawerOpen.currentIdx]?.gTotal)) + [isDrawerOpen.currentIdx]?.gRating * ([isDrawerOpen.currentIdx]?.gTotal / ([isDrawerOpen.currentIdx]?.yTotal + [isDrawerOpen.currentIdx]?.gTotal))).toFixed(1)) }
                                <span>&nbsp;</span>
                                <Rating name="read-only" value={ parseFloat((restaurants[isDrawerOpen.currentIdx]?.yRating * ([isDrawerOpen.currentIdx]?.yTotal / ([isDrawerOpen.currentIdx]?.yTotal + [isDrawerOpen.currentIdx]?.gTotal)) + [isDrawerOpen.currentIdx]?.gRating * ([isDrawerOpen.currentIdx]?.gTotal / ([isDrawerOpen.currentIdx]?.yTotal + [isDrawerOpen.currentIdx]?.gTotal))).toFixed(1)) } precision={0.1} readOnly />
                            </Typography> */}
                            <Typography style={{ fontSize: '1.5rem', marginBottom: '0.6rem'}}>
                                {restaurants[isDrawerOpen.currentIdx]?.name}
                            </Typography>
                            {/* <ListItemText>{restaurants[isDrawerOpen.currentIdx]?.name}</ListItemText> */}
                            <Typography>
                                Yelp: 
                                <span>&nbsp;</span>
                                <IconButton sx={{ p: '2px' }} href={restaurants[isDrawerOpen.currentIdx]?.url}>
                                    <LaunchIcon />
                                </IconButton>
                            </Typography>
                            <Typography className={classes.ratingTextSide}>
                            {/* <ListItemText> */}
                                <span>&nbsp;</span><span>&nbsp;</span>
                                {restaurants[isDrawerOpen.currentIdx]?.yRating} 
                                <span>&nbsp;</span>
                                {/* <img src={`/pictures/small_${restaurants[isDrawerOpen.currentIdx]?.yRating}.png`} /> */}
                                <Rating name="read-only" value={restaurants[isDrawerOpen.currentIdx]?.yRating} precision={0.1} readOnly />
                                <span>&nbsp;</span>
                                {restaurants[isDrawerOpen.currentIdx]?.yTotal.toLocaleString('en-US')} reviews
                            {/* </ListItemText> */}
                                
                            </Typography>
                            
                            <Divider variant="middle" />
                            <hr />
                            <Typography>
                                Google: 
                                <span>&nbsp;</span>
                                <IconButton sx={{ p: '2px' }} href={restaurants[isDrawerOpen.currentIdx]?.url}>
                                    <LaunchIcon />
                                </IconButton>
                            </Typography>
                            <Typography className={classes.ratingTextSide}>
                            {/* <ListItemText> */}
                                <span>&nbsp;</span><span>&nbsp;</span>
                                {restaurants[isDrawerOpen.currentIdx]?.gRating} <span>&nbsp;</span>
                                <Rating name="read-only" value={restaurants[isDrawerOpen.currentIdx]?.gRating} precision={0.1} readOnly />
                                {restaurants[isDrawerOpen.currentIdx]?.gTotal} reviews
                            {/* </ListItemText> */}
                            </Typography>
                            <hr />
                            <Typography>
                                Foursquare: 
                                <span>&nbsp;</span>
                                <IconButton sx={{ p: '2px' }} href={restaurants[isDrawerOpen.currentIdx]?.url}>
                                    <LaunchIcon />
                                </IconButton>
                            </Typography>
                            <Typography className={classes.ratingTextSide}>
                                <span>&nbsp;</span><span>&nbsp;</span>
                            </Typography>
                            <ListItemText
                                style={{ marginTop: '2rem'}}
                            >
                                {restaurants[isDrawerOpen.currentIdx]?.category.map((c, i)=>{
                                    return(
                                        <Chip key={i} label={c} style={{ margin: '0.5rem' }} 
                                            // avatar={<Avatar alt={c} src={`pictures/cuisines/${c.split(' ').join('')}.png`} />}
                                        />
                                    )
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