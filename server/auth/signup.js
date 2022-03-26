const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Favorites = require("../db/models/Favorites");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body.data);
    await user.addFavorites(await Favorites.create());
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      console.log(err);
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});
