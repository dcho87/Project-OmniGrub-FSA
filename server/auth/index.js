const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
    try {
      res.send({ token: await User.authenticate(req.body.data) });
    } catch (err) {
      next(err);
    }
});