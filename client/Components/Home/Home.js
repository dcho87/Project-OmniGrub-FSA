import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRest,
  getGoogleRestaurant,
  reverseGeocode,
  findNearby,
  findNearbyFour,
} from "../../store";
import { Box, Container, Typography, Paper, Pagination } from "@mui/material";
import { useStyles } from "../../styles";
import LocationInput from "./LocationInput";
import Category from "./Category";
import RestaurantGrid from "./RestaurantGrid";
import usePagination from "./Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const classes = useStyles();
  // STATES
  const [restaurantsY, setRestaurantsY] = useState([]);
  const [restaurantsG, setRestaurantsG] = useState([]);
  const [restaurantsF, setRestaurantsF] = useState([]);
  const [totalRests, setTotalRests] = useState([]);
  const [loading, setLoading] = useState(false);
  // LOCATION
  const [zip, setZip] = useState("");
  // PAGINATION
  let [page, setPage] = useState(1);
  const countPerPage = 7;
  const count = Math.ceil(totalRests.length / countPerPage);
  const _totalRests = usePagination(totalRests, count);
  // CATEGORY & CUISINE
  const cuisines = [
    "Show All",
    "Asian",
    "Burgers",
    "Pizza",
    "Mexican",
    "Chinese",
    "Thai",
    "Japanese",
    "Korean",
    "American",
    "Chicken",
    "Indian",
    "Healthy",
    "Salads",
    "Vegan",
    "Italian",
    "Breakfast & Brunch",
    "Diner",
    "Desserts",
    "Fast Food",
    "Bubble Tea",
    "Bakery",
    "Vietnamese",
    "French",
    "Spanish",
    "Taiwanese",
    "Poke",
    "African",
    "Ramen",
    "Sushi",
    "BBQ",
    "Soup",
    "Coffee & Tea",
    "Sandwich",
    "Smoothy",
    "Kosher",
    "Soul Food",
    "Brazilian",
    "Comfort Food",
    "Greek",
    "Portuguese",
    "Dominican",
    "Wings",
    "Barfood",
    "Turkish",
    "Alcohol",
  ];
  const [category, setCategory] = useState(cuisines);
  const [filtered, setFiltered] = useState(false);
  // DRAWER
  const [isDrawerOpen, setIsDrawerOpen] = useState({
    isOpen: false,
    currentIdx: 0,
  });
  // HANDLE DRAWER
  const handleDrawer = (openBool, id) => {
    // const handleDrawer = (ev) => {
    // const found = totalRests.filter(r => r.name === ev.target.innerText)
    // console.log(found[0].id)
    setIsDrawerOpen({
      isOpen: openBool,
      currentIdx: id,
      // isOpen: true,
      // currentIdx: found[0].id
    });
  };
  // ZIPCODE LOCATION
  const onChange = (ev) => {
    setZip({ ...zip, zip: ev.target.value });
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    try {
      dispatch(findNearby(zip.zip)).then(() =>
        setRestaurantsY(state.yelpSlice[0])
      );
      dispatch(getGoogleRestaurant(zip.zip)).then(() =>
        setRestaurantsG(state.googleStore.gRest)
      );
      dispatch(findNearbyFour(zip.zip)).then(() =>
        setRestaurantsF(state.fourSlice[0])
      );
    } catch (error) {
      console.log(error);
    }
  };
  // FOUR SETSTATE
  useEffect(() => {
    try {
      if (state.fourSlice[0]) {
        setLoading(true);
        const cleanFour = [...state.fourSlice[0]].map((e) => {
          return {
            name: e.name,
            fRating: e.rating,
            fTotal: e.stats?.total_ratings,
            restUrl: e.website,
          };
        });
        setRestaurantsF(cleanFour);
      }
    } catch (e) {
      console.log(e);
    }
  }, [state.fourSlice[0]]);
  // YELP SETSTATE
  useEffect(() => {
    try {
      if (state.yelpSlice[0]) {
        setLoading(true);
        const cleanYelp = [...state.yelpSlice[0].businesses].map((e) => {
          return {
            name: e.name,
            yRating: e.rating,
            yLat: e.coordinates.latitude,
            image: e.image_url,
            yTotal: e.review_count,
            category: e.categories.map((c) => c.title),
            url: e.url,
          };
        });
        setRestaurantsY(cleanYelp);
      }
    } catch (e) {
      console.log(e);
    }
  }, [state.yelpSlice[0]]);
  const combineArr = (arr1, arr2) => {
    return arr1.map((e, idx) => {
      arr2.forEach((x) => {
        if (x.name === e.name) {
          e.gRating = x.gRating;
          e.gLat = x.gLat;
          e.gTotal = x.gTotal;
          e.gId = x.gId;
        } else {
          e.gRating = e.gRating > 0 ? e.gRating : 0;
          e.gTotal = e.gTotal > 0 ? e.gTotal : 0;
        }
      });
      return e;
    });
    // .sort((a, b)=> b.gRating - a.gRating)
  };
  const combineArr2 = (arr1, arr2) => {
    return arr1.map((e) => {
      arr2.forEach((x) => {
        if (x.name === e.name) {
          e.fRating = parseFloat((x.fRating / 2).toFixed(1));
          e.fTotal = x.fTotal;
          e.restUrl = x.restUrl;
        } else {
          e.fRating = e.fRating ? e.fRating : 0;
          e.fTotal = e.fTotal > 0 ? e.fTotal : 0;
        }
      });
      return e;
    });
    // .sort((a, b) => b.gRating - a.gRating);
    // .sort((a, b) => b.fRating - a.fRating);
  };
  const reduceSize = (arr) => {
    // if only yelp and both google, fsq is not available drop
    const returnArr = [];
    arr.map((r) => {
      if (r.gRating || r.fRating) {
        returnArr.push(r);
      }
    });
    returnArr.forEach((e, idx) => {
      e.id = idx;
      if (e.gRating) {
        // just yelp and google
        e.oRating = parseFloat(
          (
            e.yRating * (e.yTotal / (e.yTotal + e.gTotal)) +
            e.gRating * (e.gTotal / (e.yTotal + e.gTotal))
          ).toFixed(1)
        );
      } else if (e.fRating) {
        // just yelp and 4sq
        e.oRating = parseFloat(
          (
            e.yRating * (e.yTotal / (e.yTotal + e.fTotal)) +
            e.fRating * (e.fTotal / (e.yTotal + e.fTotal))
          ).toFixed(1)
        );
      } else {
        // all 3
        e.oRating = parseFloat(
          (
            e.yRating * (e.yTotal / (e.yTotal + e.fTotal + e.gTotal)) +
            e.gRating * (e.gTotal / (e.yTotal + e.fTotal + e.gTotal)) +
            e.fRating * (e.fTotal / (e.yTotal + e.fTotal + e.gTotal))
          ).toFixed(1)
        );
      }
    });
    return returnArr;
  };
  // GOOGLE SETSTATE
  useEffect(() => {
    try {
      if (state.googleStore.gRest) {
        const cleanGoog = [...state.googleStore.gRest].map((e) => {
          return {
            name: e.name,
            gRating: e.rating,
            gLat: e.geometry.location.lat,
            gTotal: e.user_ratings_total,
            gId: e.place_id,
          };
        });
        setRestaurantsG(cleanGoog);
        const combined = combineArr(restaurantsY, cleanGoog);
        const combinedWithFour = combineArr2(combined, restaurantsF);
        const reduced = reduceSize(combinedWithFour);
        setTotalRests(reduced);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [state.googleStore]);
  // FILTERING
  const handleFilter = (ev) => {
    let newCuisine = ev.target.textContent;
    setCategory(newCuisine);
    let newRestList = combineArr(restaurantsY, restaurantsG);
    if (newCuisine === "Show All") {
      setTotalRests(newRestList);
    } else if (category) {
      newRestList = newRestList.filter((r) => r.category.includes(newCuisine));
      setTotalRests(newRestList);
    }
    setFiltered(true);
  };
  // PAGINATE
  const changePage = (e, p) => {
    setPage(p);
    _totalRests.jump(p);
  };
  // GETTING USER'S LOCATION
  function getPosition() {
    return new Promise((success) =>
      navigator.geolocation.getCurrentPosition(success)
    );
  }
  async function geoCode() {
    const p = await getPosition();
    try {
      dispatch(reverseGeocode(p.coords.latitude, p.coords.longitude)).then(
        () => {
          setRestaurantsY(state.yelpSlice[0]);
          setRestaurantsG(state.googleStore.gRest);
          setRestaurantsF(state.fourSlice[0]);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(totalRests)
  return (
    <main className={classes.root}>
      <Box sx={{ bgcolor: "#FFF", pt: 8, pb: 6, minHeight:"100vh" }}>
        <Container maxWidth="sm" className={classes.hero}>
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Your views to all reviews
          </Typography>
          <LocationInput
            zip={zip}
            onChange={onChange}
            onSubmit={onSubmit}
            geoCode={geoCode}
          />
        </Container>
        <Paper className={classes.containerBoth}>
          <Category cuisines={cuisines} handleFilter={handleFilter} />
          {loading ? (
            <img
              id="loading"
              style={{ height: "auto" }}
              src="/pictures/snail.gif"
            />
          ) : (
            ""
          )}
          {totalRests ? (
            <RestaurantGrid
              restaurants={_totalRests}
              totalRests={totalRests}
              setIsDrawerOpen={setIsDrawerOpen}
              isDrawerOpen={isDrawerOpen}
              handleDrawer={handleDrawer}
              user={state.auth}
              favoriteList={state.favoriteStore}
            />
          ) : (
            ""
          )}
        </Paper>
        <Pagination
          className={classes.pagination}
          count={count}
          size="large"
          page={page}
          onChange={changePage}
        />
      </Box>
    </main>
  );
};


export default Home;
