const router = require("express").Router();
module.exports = router;

router.use("/login", require("./login"));
router.use("/google", require("./google"));
router.use("/me", require("./me"));
router.use("/signup", require("./signup"));
router.use("/facebook", require("./facebook"))
router.use("/exists",require("./exists"))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
