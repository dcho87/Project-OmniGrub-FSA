const db = require('./db')
const User = require("./models/User");
const RestaurantG = require('./models/RestaurantG')
const RestaurantY = require('./models/RestaurantY')
const RestaurantAgg = require('./models/RestaurantAgg')
const Favorites = require('./models/Favorites')

//Associations go here


module.exports = {
    db,
    models: {
      User,
      RestaurantY,
      RestaurantG,
      Favorites,
      RestaurantAgg
    },
};