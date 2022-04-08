import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRest, getGoogleRestaurant, reverseGeocode, findNearby, findNearbyFour } from "../../store";
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
  const countPerPage = 5;
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
    restName: '',
    currentIdx: 0,
  });
  // HANDLE DRAWER
  const handleDrawer = (openBool, ev) => {
    let indexR = 0;
    let currentR = '';

    if(ev){
      currentR = ev.target.innerText
      indexR = totalRests.findIndex(r => r.name === ev.target.innerText)
    }
    setIsDrawerOpen({
      isOpen: openBool,
      restName: currentR,
      currentIdx: indexR,
    });
  };
  // ZIPCODE LOCATION
  const onChange = (ev) => {
    setZip({ ...zip, zip: ev.target.value });
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    try {
      setRestaurantsG([]);
      dispatch(findNearby(zip.zip))
        .then(() => setRestaurantsY(state.yelpSlice[0]))
        .then(() => setRestaurantsG(state.googleStore));

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
            fUrl: `https://foursquare.com/v/${e.name}/${e.fsq_id}`
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
  // COMBINING API RESULTS WITH GOOGLE RESULTS
  const combineArr = (arr1, arr2) => {
    return arr1.map((e, idx) => {
      arr2.forEach((x) => {
        if (x.name.slice(0, 5) === e.name.slice(0, 5)) {
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
  };
  // COMBINING WITH FSQ RESULTS
  const combineArr2 = (arr1, arr2) => {
    return arr1.map((e) => {
      arr2.forEach((x) => {
        if (x.name.slice(0, 5) === e.name.slice(0, 5)) {
          e.fRating = parseFloat((x.fRating / 2).toFixed(1));
          e.fTotal = x.fTotal;
          e.restUrl = x.restUrl;
          e.fUrl = x.fUrl;
        } else {
          e.fRating = e.fRating ? e.fRating : 0;
          e.fTotal = e.fTotal > 0 ? e.fTotal : 0;
        }
      });
      return e;
    });
  };
  const reduceSize = (arr) => {
    // Drop if only yelp available and google + fsq not available
    const returnArr = [];
    arr.map((r) => {
      if (r.gRating || r.fRating) {
        returnArr.push(r);
      }
    });
    returnArr.forEach((e) => {
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
    returnArr.sort((a, b) => {
      if( a.fRating === 0 || a.gRating === 0) return -1
      if( b.fRating === 0 || b.gRating === 0) return -1
      return 0
    }).forEach((e, idx) => e.id = idx)
    return returnArr;
  };
  // GOOGLE SETSTATE
  useEffect(() => {
    try {
      if (state.googleStore) {
        setLoading(true);
        const cleanGoog = [...state.googleStore].map((e) => {
          return {
            name: e.name,
            gRating: e.rating,
            gLat: e.geometry.location.lat,
            gTotal: e.user_ratings_total,
            gId: e.place_id,
          };
        });
        setRestaurantsG(cleanGoog);
        const combinedWithFour = combineArr2(restaurantsY, restaurantsF);
        const combined = combineArr(combinedWithFour, cleanGoog)
                .sort((a, b) => {
                    //sort Google ratings first
                    if (a.gRating === b.gRating) {
                      return 0;
                    } else if (a.gRating < b.gRating) {
                      return -1;
                    }
                    return 1;
                  })
                  .sort((x, y) => {
                    if (x.fRating === 0) return -1;
                    return 1;
                  });
        const reduced = reduceSize(combined);
        setTotalRests(reduced);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [state.googleStore]);
  // FILTERING
  const handleFilter = (ev) => {
    console.log('filtered', totalRests)
    let newCuisine = ev.target.textContent;
    setCategory(newCuisine);
    // before it was filtering just yelp and google so added fsq too
    let newRestList1 = combineArr2(restaurantsY, restaurantsF);
    let newRestList2 = combineArr(newRestList1, restaurantsG);
    let combinedNewLists = reduceSize(newRestList2);
    if (newCuisine === "Show All") {
      setTotalRests(combinedNewLists);
      setFiltered(false);
    } else if (category) {
      // now if the category includes a part of the cuisine word, spits out that result
      combinedNewLists = combinedNewLists.filter((r) => r.category.join('').includes(newCuisine));
      setTotalRests(combinedNewLists);
      console.log(combinedNewLists)
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
          setRestaurantsG(state.googleStore);
          setRestaurantsF(state.fourSlice[0]);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  console.log(totalRests)
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
              filtered={filtered}
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
