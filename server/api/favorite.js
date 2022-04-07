const router = require("express").Router();
const axios = require("axios");
const Favorites = require("../db/models/Favorites");
const RestaurantG = require("../db/models/RestaurantG");
const RestaurantY = require("../db/models/RestaurantY");
const RestaurantAgg = require("../db/models/RestaurantAgg");
module.exports = router;

//GET Favorite ID by User ID
router.get("/:id", async (req, res, next) => {
  try {
    let list = await Favorites.findByPk(req.params.id, {
      include: [RestaurantAgg],
    });
    res.send(list);
  } catch (ex) {
    next(ex);
  }
});

//GET Favorite List by Favorite ID
router.get("/list/:id", async (req, res, next) => {
  try {
    let list = await RestaurantAgg.findAll({
      where: {
        favoriteId: req.params.id,
      },
      include: [RestaurantY],
    });
    res.send(list);
  } catch (ex) {
    next(ex);
  }
});

//GET Yelp Review by ID
router.get("/y/:id", async (req, res, next) => {
  try {
    const yReview = await RestaurantY.findByPk(req.params.id);
    res.send(yReview);
  } catch (ex) {
    next(ex);
  }
});

//PUT Yelp DB
router.put("/:id", async (req, res, next) => {
  try {
    const yId = req.body.yLat.toString().slice(0, 8);

    //Add Restaurant Data into DB
    await RestaurantY.findOrCreate({
      where: {
        id: req.body.yLat.toString().slice(0, 8),
        name: req.body.name,
        greviewCounts: req.body.gTotal,
        grating: req.body.gRating,
        yreviewCounts: req.body.yTotal,
        yrating: req.body.yRating,
        url: req.body.url,
        image: req.body.image,
        yLat: req.body.yLat,
        frating: req.body.fRating,
        freviewCounts: req.body.fTotal,
      },
    });

    //Create Association between Favorite and Restaurant
    res.send(
      await RestaurantAgg.findOrCreate({
        where: {
          favoriteId: req.params.id,
          restaurantyId: yId,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

//REMOVE Favorite Association
router.put("/remove/:id", async (req, res, next) => {
  try {
    const yId = req.body.yLat.toString().slice(0, 8);
    const association = await RestaurantAgg.findOne({
      where: {
        favoriteId: req.params.id,
        restaurantyId: yId,
      },
    });
    await association.destroy();
    res.send();
  } catch (ex) {
    next(ex);
  }
});
