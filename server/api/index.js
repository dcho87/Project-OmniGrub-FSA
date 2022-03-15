const router = require("express").Router();
module.exports = router;

router.use("/testRest", require("./testRestaurants"));
router.use("/google", require("./google"));
router.use("/yelpAPI", require("./yelpAPI"));
router.use("/users", require("./users"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
