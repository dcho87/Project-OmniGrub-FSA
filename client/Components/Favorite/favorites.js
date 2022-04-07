import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite } from "../../store";
import { Box, Typography, Rating, Divider, Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useStyles, FiCard, FiCardContent, FiCardMedia } from "../../styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Favorite = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.favoriteStore);
  const user = useSelector((state) => state.auth);
  const classes = useStyles();

  // STATES
  const [open, setOpen] = React.useState(false);

  const onClick = (restaurant, user) => {
    dispatch(addToFavorite(restaurant, user));
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper className={classes.containerBoth} sx={{ minHeight: "80vh" }}>
      {store.map((restaurants, idx) => {
        const restaurant = restaurants.restauranty;
        return (
          <main className={classes.root}>
            <Box key={idx} className={classes.singleBoxes}>
              <FiCard className={classes.card}>
                <FiCardMedia
                  media="picture"
                  alt={restaurant.name}
                  image={restaurant.image}
                  title={restaurant.name}
                />
                <FiCardContent className={classes.fiCardContent}>
                  <FavoriteIcon
                    sx={{ color: "#E74E35" }}
                    onClick={() => {
                      onClick(restaurant, user);
                    }}
                  />
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Removed from Favorite
                    </Alert>
                  </Snackbar>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ cursor: "pointer" }}
                  >
                    {restaurant.name}
                  </Typography>
                  <Typography className={classes.ratingTextOmni}>
                    OmniGrub:
                    <span>&nbsp;</span>
                    {parseFloat(
                      (
                        restaurant.yrating *
                          (restaurant.yreviewCounts /
                            (restaurant.yreviewCounts +
                              restaurant.greviewCounts)) +
                        restaurant.grating *
                          (restaurant.greviewCounts /
                            (restaurant.yreviewCounts +
                              restaurant.greviewCounts))
                      ).toFixed(1)
                    )}
                    <span>&nbsp;</span>
                    <Rating
                      name="read-only"
                      sx={{ color: "#E74E35" }}
                      value={parseFloat(
                        (
                          restaurant.yrating *
                            (restaurant.yreviewCounts /
                              (restaurant.yreviewCounts +
                                restaurant.greviewCounts)) +
                          restaurant.grating *
                            (restaurant.greviewCounts /
                              (restaurant.yreviewCounts +
                                restaurant.greviewCounts))
                        ).toFixed(1)
                      )}
                      precision={0.1}
                      readOnly
                    />
                  </Typography>
                  <Divider variant="middle" />
                  <Box className={classes.comparison}>
                    <Typography className={classes.ratingText}>
                      Yelp: {restaurant.yrating}
                      <span>&nbsp;</span>
                      <StarIcon sx={{ color: "#E74E35" }} />
                      <span>&nbsp;</span>
                    </Typography>
                    <Typography className={classes.ratingText}>
                      Google: {restaurant.grating}
                      <span> &nbsp; </span>
                      {restaurant.gRating === 0 ? (
                        <StarOutlineIcon sx={{ color: "#E74E35" }} />
                      ) : (
                        <StarIcon sx={{ color: "#E74E35" }} />
                      )}
                      <span>&nbsp;</span>
                    </Typography>
                    <Typography className={classes.ratingText}>
                      Foursquare: {restaurant.frating}
                      <span> &nbsp; </span>
                      {restaurant.fRating === 0 ? (
                        <StarOutlineIcon sx={{ color: "#E74E35" }} />
                      ) : (
                        <StarIcon sx={{ color: "#E74E35" }} />
                      )}
                      <span>&nbsp;</span>
                    </Typography>
                  </Box>
                </FiCardContent>
              </FiCard>
            </Box>
          </main>
        );
      })}
    </Paper>
  );
};
