import React from "react";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../../store";
import { Box, Typography, Rating, Divider, Drawer, List, ListItem, ListItemText, Chip, Avatar, IconButton } from "@mui/material";
// import GoogleIcon from '@mui/icons-material/Google';
import LaunchIcon from "@mui/icons-material/Launch";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useStyles, FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia } from "../../styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert1 = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RestaurantGrid = ({
  restaurants,
  totalRests,
  handleDrawer,
  isDrawerOpen,
  setIsDrawerOpen,
  user,
  favoriteList,
  filtered
}) => {
  restaurants = restaurants.currentData();
  // console.log(restaurants)
  const dispatch = useDispatch();
  const classes = useStyles();
  // FAVORITES STATES
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  // FAVORITE HANDLERS
  const onClick1 = (restaurant, user) => {
    dispatch(addToFavorite(restaurant, user));
    setOpen1(true);
  };
  const onClick2 = (restaurant, user) => {
    dispatch(addToFavorite(restaurant, user));
    setOpen2(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
    setOpen2(false);
  };
  // FAVORITE LIST 
  const favList = [];
  Object.keys(favoriteList).forEach(function (key) {
    favList.push(favoriteList[key]["restaurantyId"]);
  });
  let mappingRests;
  if(filtered){
    mappingRests = totalRests
  } else {
    mappingRests = restaurants
  }
  console.log(mappingRests)
  return (
    <>
    
      {mappingRests.map((restaurant, idx) => {
        const lat = restaurant.yLat.toString().slice(0, 8);
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
                {favList.includes(lat) ? (
                  <>
                    {" "}
                    <FavoriteIcon
                      onClick={() => {
                        onClick1(restaurant, user);
                      }}
                    />{" "}
                    <Snackbar
                      open={open1}
                      autoHideDuration={3000}
                      onClose={handleClose}
                    >
                      <Alert1
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        Removed from Favorite
                      </Alert1>
                    </Snackbar>
                  </>
                ) : (
                  <>
                    {" "}
                    <FavoriteBorderIcon
                      onClick={() => {
                        onClick2(restaurant, user);
                      }}
                    />
                    <Snackbar
                      open={open2}
                      autoHideDuration={3000}
                      onClose={handleClose}
                    >
                      <Alert1
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        Added to Favorite
                      </Alert1>
                    </Snackbar>
                  </>
                )}
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  // onClick={() => handleDrawer(true, restaurant.id)}
                  onClick={(ev) => handleDrawer(true, ev)}
                  style={{ cursor: "pointer" }}
                >
                  {restaurant.name}
                </Typography>
                <Typography className={classes.ratingTextOmni}>
                  {/* Average Rating:  */}
                  OmniGrub:
                  <span>&nbsp;</span>
                  {restaurant.oRating}
                  <span>&nbsp;</span>
                  <Rating
                    name="read-only"
                    value={restaurant.oRating}
                    precision={0.1}
                    readOnly
                  />
                </Typography>
                {/* <hr /> */}
                <Divider variant="middle" />
                <Box className={classes.comparison}>
                  <Typography className={classes.ratingText}>
                    Yelp: {restaurant.yRating}
                    <span>&nbsp;</span>
                    <StarIcon />
                    <span>&nbsp;</span>
                    {/* ({restaurant.yTotal.toLocaleString('en-US')}) */}
                  </Typography>

                  {/* <span> &nbsp; </span> */}
                  <Typography className={classes.ratingText}>
                    Google: {restaurant.gRating}
                    <span> &nbsp; </span>
                    {restaurant.gRating === 0 ? (
                      <StarOutlineIcon />
                    ) : (
                      <StarIcon />
                    )}
                    <span>&nbsp;</span>
                    {/* ({restaurant.gTotal.toLocaleString('en-US')}) */}
                  </Typography>
                  <Typography className={classes.ratingText}>
                    Foursquare: {restaurant.fRating}
                    <span> &nbsp; </span>
                    {restaurant.fRating === 0 ? (
                      <StarOutlineIcon />
                    ) : (
                      <StarIcon />
                    )}
                    <span>&nbsp;</span>
                    {/* ({restaurant.gTotal.toLocaleString('en-US')}) */}
                  </Typography>
                </Box>
              </FiCardContent>
            </FiCard>
          </Box>
        );
      })}
      <Drawer
        anchor="right"
        open={isDrawerOpen.isOpen}
        onClose={() => handleDrawer(false)}
        BackdropProps={{
          style: {
            opacity: 4,
          },
        }}
        // PaperProps={{
        //     sx: {
        //         backgroundColor: 'rgb(231, 78, 53)',
        //     }
        // }}
      >
        <Box
          p={2}
          width="300px"
          textAlign="center"
          role="presentation"
          className={classes.slidePanel}
        >
          <Box
            component="img"
            style={{
              width: "auto",
            }}
            src={totalRests[isDrawerOpen.currentIdx]?.image}
          ></Box>
          <List>
            <ListItem className={classes.slidePanelDetails} spacing={1}>
              <Typography
                style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}
              >
                {totalRests[isDrawerOpen.currentIdx]?.name}
                <span>&nbsp;</span>
                { totalRests[isDrawerOpen.currentIdx]?.restUrl ? (
                  <IconButton
                    sx={{ p: "1.5px" }}
                    href={totalRests[isDrawerOpen.currentIdx]?.restUrl}
                  >
                    <LaunchIcon />
                  </IconButton>
              ) : ''}
              </Typography>
              <Typography className={classes.ratingTextSide}>
                OmniGrub:
                <span>&nbsp;</span>
                {totalRests[isDrawerOpen.currentIdx]?.oRating}
                <span>&nbsp;</span>
                <Rating
                  name="read-only"
                  value={totalRests[isDrawerOpen.currentIdx]?.oRating || 0}
                  precision={0.1}
                  readOnly
                />
              </Typography>
              <Typography
                style={{ fontSize: "0.7rem", color: "rgb(128, 128, 128)" }}
              >
                * weighted average
              </Typography>
              <Divider variant="middle" />
              <hr />

              <Typography className={classes.ratingTextSide}>
                Yelp:
                <span>&nbsp;</span>
                <IconButton
                  sx={{ p: "2px" }}
                  href={totalRests[isDrawerOpen.currentIdx]?.url}
                >
                  <LaunchIcon />
                </IconButton>
              </Typography>
              <Typography className={classes.ratingTextSide}>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                {totalRests[isDrawerOpen.currentIdx]?.yRating}
                <span>&nbsp;</span>
                <Rating
                  name="read-only"
                  value={totalRests[isDrawerOpen.currentIdx]?.yRating || 0}
                  precision={0.1}
                  readOnly
                />
                <span>&nbsp;</span>
                {totalRests[isDrawerOpen.currentIdx]?.yTotal.toLocaleString(
                  "en-US"
                )}{" "}
                reviews
              </Typography>

              <Divider variant="middle" />
              <hr />
              <Typography className={classes.ratingTextSide}>
                Google:
                <span>&nbsp;</span>
                
              </Typography>
              {totalRests[isDrawerOpen.currentIdx]?.gRating !== 0 ? (
                <Typography className={classes.ratingTextSide}>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  {totalRests[isDrawerOpen.currentIdx]?.gRating}{" "}
                  <span>&nbsp;</span>
                  <Rating
                    name="read-only"
                    value={totalRests[isDrawerOpen.currentIdx]?.gRating || 0}
                    precision={0.1}
                    readOnly
                  />
                  {totalRests[isDrawerOpen.currentIdx]?.gTotal} reviews
                </Typography>
              ) : (
                <Typography className={classes.ratingTextSide}>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>Not found on Google
                </Typography>
              )}

              <hr />
              <Typography className={classes.ratingTextSide}>
                Foursquare:
                <span>&nbsp;</span>
                {totalRests[isDrawerOpen.currentIdx]?.fRating !== 0 ? (
                  <IconButton
                    sx={{ p: "1.5px" }}
                    href={totalRests[isDrawerOpen.currentIdx]?.fUrl}
                  >
                    <LaunchIcon />
                  </IconButton>
                ) : (
                  ""
                )}
              </Typography>
              {totalRests[isDrawerOpen.currentIdx]?.fRating !== 0 ? (
                <Typography className={classes.ratingTextSide}>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  {totalRests[isDrawerOpen.currentIdx]?.fRating}{" "}
                  <span>&nbsp;</span>
                  <Rating
                    name="read-only"
                    value={totalRests[isDrawerOpen.currentIdx]?.fRating || 0}
                    precision={0.1}
                    readOnly
                  />
                  <span>&nbsp;</span>
                  {totalRests[isDrawerOpen.currentIdx]?.fTotal} reviews
                </Typography>
              ) : (
                <Typography className={classes.ratingTextSide}>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>Not found on Foursquare
                </Typography>
              )}
              <ListItemText style={{ marginTop: "2rem" }}>
                {totalRests[isDrawerOpen.currentIdx]?.category.map((c, i) => {
                  return (
                    <Chip
                      key={i}
                      label={c}
                      style={{ margin: "0.5rem" }}
                      // avatar={<Avatar alt={c} src={`pictures/cuisines/${c.split(' ').join('')}.png`} />}
                    />
                  );
                })}
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default RestaurantGrid;
