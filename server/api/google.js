const router = require("express").Router();
const axios = require("axios");
module.exports = router;

//GET Geocode
router.get("/geocode/:id", async (req, res, next) => {
  try {
    let data = [];
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: req.params.id,
          key: process.env.SECRET_KEY_GOOGLE,
        },
      }
    );
    data = response.data;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

//GET Reverse Geocode
router.get("/geocode/reverse/:latlng", async (req, res, next) => {
  try {
    let data = [];
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: req.params.latlng,
          key: process.env.SECRET_KEY_GOOGLE,
        },
      }
    );
    data = response.data;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

//GET a List of Restaurant
router.get("/searchnear/:location", async (req, res, next) => {
  try {
    let response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          key: process.env.SECRET_KEY_GOOGLE,
          location: req.params.location,
          radius: 5000,
          keyword: "restaurant",
          pagetoken: "",
        },
      }
    );
    //tokenArray will hold all the tokens that are provided with each API call. Each call produces a different token
    const tokenArray = [response.data.next_page_token];
    //This is done as an alternative because prior to this setup, each loop was running WITHOUT waiting for the timer to finish
    const delay = (ms) => {
      return new Promise((resolve, reject) => setTimeout(resolve, ms));
    };
    const loopNextCalls = async () => {
      for (let i = 0; i < 3; i++) {
        await delay(2000);
        const page = await axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
          {
            params: {
              key: process.env.SECRET_KEY_GOOGLE,
              pagetoken: tokenArray[i],
            },
          }
        );

        tokenArray.push(page.data.next_page_token);

        response.data.results.push(...page.data.results);
      }
    };
    loopNextCalls();

    setTimeout(() => {
      /* script responsible for showing what response.data looks like cleaned up */
      const google = response.data;
      const sort = google.results.sort((a, b) => (a.name > b.name ? 1 : -1));
      const map = sort.map((e) => {
        return [e.name, e.geometry.location.lat];
      });
      //Last line that sends out to the front end
      res.send(response.data);
    }, 6000);
  } catch (err) {
    next(err);
  }
});

//GET Place Data
router.put("/placedata", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          key: process.env.SECRET_KEY_GOOGLE,
          query:
            "restaurant" +
            req.body.name +
            req.body.location.zip_code +
            req.body.location.address1,
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

//Google Autocomplete
router.get("/location", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/json",
      {
        params: {
          key: process.env.SECRET_KEY_GOOGLE,
          libraries: "places",
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});
