import React from "react";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../store";
import { Box, Typography, Rating, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  useStyles,
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia,
} from "../styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const RestaurantGrid = ({ restaurants, user }) => {
  restaurants = restaurants.currentData();
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClick = (restaurant, user) => {
    dispatch(addToFavorite(restaurant, user));
  };

  return (
    <>
      {restaurants.map((restaurant, idx) => {
        // console.log(restaurant);
        return (
          <Box key={idx} className={classes.singleBoxes}>
            <FiCard className={classes.card}>
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
                <Typography gutterBottom variant="h5" component="h2">
                  {restaurant.name}
                </Typography>
                <Typography>
                  {/* Average Rating:  */}
                  <Rating
                    name="read-only"
                    value={parseFloat(
                      (
                        restaurant.yRating *
                          (restaurant.yTotal /
                            (restaurant.yTotal + restaurant.gTotal)) +
                        restaurant.gRating *
                          (restaurant.gTotal /
                            (restaurant.yTotal + restaurant.gTotal))
                      ).toFixed(1)
                    )}
                    readOnly
                  />
                  (
                  {parseFloat(
                    (
                      restaurant.yRating *
                        (restaurant.yTotal /
                          (restaurant.yTotal + restaurant.gTotal)) +
                      restaurant.gRating *
                        (restaurant.gTotal /
                          (restaurant.yTotal + restaurant.gTotal))
                    ).toFixed(1)
                  )}
                  )
                </Typography>
                <Typography>
                  {/* {restaurant.category.join(', ')} */}
                </Typography>
                <Box className={classes.comparison}>
                  <Typography>Yelp: {restaurant.yRating}</Typography>
                  {/* <Divider orientation="vertical" flexItem></Divider> */}
                  <span> &nbsp; </span>
                  <Typography>Google: {restaurant.gRating}</Typography>
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
        );
      })}
    </>
  );
};

export default RestaurantGrid;
