const router = require("express").Router();
module.exports = router;
const axios = require("axios");
router.get("/:zip", async (req, res, next) => {
  try {
    let data = [];
    await axios
      .get(`https://api.yelp.com/v3/businesses/search`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY_YELP}`,
        },
        params: {
          location: req.params.zip,
          limit: 50,
        },
      })
      .then((response) => {
        data = response.data;
      });
    res.send(data);
  } catch (err) {
    next(err);
  }
});
