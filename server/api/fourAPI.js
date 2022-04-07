const router = require("express").Router();
module.exports = router;
const axios = require("axios");
router.get("/:zip", async (req, res, next) => {
  try {
    let data = [];
    let stringer = "";
    for (let i = 13000; i < 13387; i++) {
      stringer = stringer + `,${i}`;
    }
    await axios
      .get(`https://api.foursquare.com/v3/places/search`, {
        headers: {
          Authorization: `${process.env.SECRET_KEY_FOURSQUARE}`,
        },
        params: {
          near: req.params.zip,
          categories: stringer.substring(1),
          limit: 50,
          fields: "rating,name,fsq_id,location,website,stats,tips",
        },
      })
      .then((response) => {
        data = response.data.results;
      });
    res.send(data);
  } catch (err) {
    next(err);
  }
})