const router = require("express").Router();
const axios = require("axios");
const Favorites = require("../db/models/Favorites");
const RestaurantG = require("../db/models/RestaurantG");
const RestaurantY = require("../db/models/RestaurantY");
const RestaurantAgg = require("../db/models/RestaurantAgg");
module.exports = router;

//GET Favorite by User ID
router.get("/:id", async (req, res, next) => {
  try {
    let list = await Favorites.findByPk(req.params.id, {
      include: [RestaurantG, RestaurantY],
    });
    res.send(list);
  } catch (ex) {
    next(ex);
  }
});

//POST Google DB
router.post("/", async (req, res, next) => {
  try {
    const data = {
      id: req.body.placeId,
      name: req.body.name,
      reviewCounts: req.body.reviewCounts,
      rating: req.body.rating,
      zipCode: req.body.zipcode,
      address: req.body.address,
      description: req.body.description,
      category: req.body.category,
    };
    res.send(await RestaurantG.create(data));
  } catch (ex) {
    next(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const favorite = await Favorites.findByPk(req.params.id);
    const resInfo = req.body.id;

    //Find or create associate between favorite and restaurant
    await RestaurantAgg.findOrCreate({
      where: {
        favoriteId: req.params.id,
        restaurantgId: resInfo,
      },
    });

    res.send(favorite);
  } catch (ex) {
    next(ex);
  }
});
