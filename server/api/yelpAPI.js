const router = require("express").Router();
module.exports = router;
const axios = require("axios");
router.get("/:zip", async (req, res, next) => {
  try {
    //'data' is what's sent up
    let data = [];
    //'builtData' is all the businesses added from all the queries
    let builtData = [];
    //'lengthTracker' tracks the length of the previous query to be matched with the current query's length. If it's the same, then it means Yelp has hit the max result of this particular search
    let lengthTracker = 0;
    //This is a toggle that's off until the while condition is met. Once it's met, the while loop should end, toggle is flipped on, and then the toggle should be flipped back off (so that a user can make another new search)
    let toggle = false;

    //First query, offset by default is set to 0
    await axios
      .get(`https://api.yelp.com/v3/businesses/search`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY_YELP}`,
        },
        params: {
          location: req.params.zip,
          term: "restaurants",
          limit: 50,
        },
      })
      .then((response) => {
        data = response.data;
        builtData = builtData.concat(response.data.businesses);
        lengthTracker = builtData.length;
      });

    //Second and so fourth queries, offset is set to 50 at first then it increments by 50 until 'toggle' is set to true indicating the previous data length is the same as the current data length
    let offset = 50;
    while (offset < 50) {
      await axios
        .get(`https://api.yelp.com/v3/businesses/search`, {
          headers: {
            Authorization: `Bearer ${process.env.SECRET_KEY_YELP}`,
          },
          params: {
            location: req.params.zip,
            term: "restaurants",
            offset: offset,
            limit: 50,
          },
        })
        .then((response) => {
          if (response.data.businesses)
            builtData = builtData.concat(response.data.businesses);
          if (builtData.length === lengthTracker) toggle = true;
          else lengthTracker = builtData.length;
        });
      offset = offset + 50;
    }
    //Confirms the builtData matches the full length of data.business
    console.log(builtData.length, "builtData");
    console.log(data.businesses.length, "data businesses");
    data.businesses = builtData;
    console.log(data.businesses.length, "data businesses");
    res.send(data);
  } catch (err) {
    next(err);
  }
});
