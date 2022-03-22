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

RestaurantAgg.belongsTo(RestaurantG);
RestaurantAgg.belongsTo(RestaurantY);
RestaurantAgg.belongsTo(Favorites);

RestaurantG.belongsToMany(Favorites, { through: RestaurantAgg });
Favorites.belongsToMany(RestaurantG, { through: RestaurantAgg });
RestaurantY.belongsToMany(Favorites, { through: RestaurantAgg });
Favorites.belongsToMany(RestaurantY, { through: RestaurantAgg });

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
