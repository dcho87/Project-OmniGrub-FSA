const router = require("express").Router();
module.exports = router;
const axios = require("axios");
router.get("/:zip", async (req, res, next) => {
  try {
    let data = [];
    await axios
      .get(`https://api.foursquare.com/v3/places/search`, {
        headers: {
          Authorization: `${process.env.SECRET_KEY_FOURSQUARE}`,
        },
        params: {
          near: req.params.zip,
          categories: 1300,
          limit: 50,
        },
      })
      .then((response) => {
        console.log(response, "response");
      });
    console.log(data, "this is the data!!!");

    res.send(data);
  } catch (err) {
    next(err);
  }
});
