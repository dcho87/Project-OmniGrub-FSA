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
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          key: process.env.SECRET_KEY_GOOGLE,
          location: req.params.location,
          radius: 1500,
          type: "restaurant",
          pagetoken: "",
        },
      }
    );
    for (let i = 0; i < 2; i++) {
      setTimeout(async () => {
        const page = await axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
          {
            params: {
              key: process.env.SECRET_KEY_GOOGLE,
              pagetoken: response.data.next_page_token,
            },
          }
        );
        response.data.results.push(...page.data.results);
      }, 1800);
    }
    setTimeout(() => {
      res.send(response.data);
    }, 4000);
  } catch (err) {
    next(err);
  }
});

//GET Place Data
router.get("/placedata", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          key: process.env.SECRET_KEY_GOOGLE,
          place_id: "ChIJkwNptPhYwokRFVgCsuHriwI",
          fields: ["name", "rating", "formatted_phone_number", "geometry"],
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
