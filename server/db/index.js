const db = require("./db");
const User = require("./models/User");
const RestaurantG = require("./models/RestaurantG");
const RestaurantY = require("./models/RestaurantY");
const RestaurantAgg = require("./models/RestaurantAgg");
const Favorites = require("./models/Favorites");
const Test = require("./models/TestData");
const TestReview = require("./models/TestReview");
//Associations go here

Favorites.belongsTo(User);
User.hasMany(Favorites);

RestaurantAgg.belongsTo(RestaurantY);
RestaurantAgg.belongsTo(Favorites);
Favorites.hasMany(RestaurantAgg);

Favorites.belongsToMany(RestaurantY, { through: RestaurantAgg });
RestaurantY.belongsToMany(Favorites, { through: RestaurantAgg });
// RestaurantG.belongsToMany(Favorites, {
//   through: RestaurantAgg,
//   foreignKey: "restaurantagg_id",
// });
// Favorites.belongsToMany(RestaurantG, {
//   through: RestaurantAgg,
//   foreignKey: "favorite_id",
// });
// Favorites.belongsToMany(RestaurantY, {
//   through: RestaurantAgg,
//   foreignKey: "favoriteId",
// });

// Test.hasMany(TestReview, {
//   // as: 'restaurant',
//   // foreignKey: 'testId',
//   // sourceKey: 'reviewId'
// });

// TestReview.belongsTo(Test, {
//   // as: 'reviewsFor',
//   foreignKey: 'restaurantId'
//   // targetKey: 'businessId',
// });

module.exports = {
  db,
  models: {
    User,
    RestaurantY,
    RestaurantG,
    Favorites,
    RestaurantAgg,
    Test,
    TestReview,
  },
};
