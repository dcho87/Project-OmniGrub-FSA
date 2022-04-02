const router = require("express").Router();
const {
  models: { User },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "firstName", "lastName", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //updating the entire user to be able to use this route to update any property
    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
