const db = require("../db");
const { STRING, INTEGER, TEXT, DECIMAL } = db.Sequelize.DataTypes;

const RestaurantG = db.define("restaurantg", {
  id: {
    type: TEXT,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  reviewCounts: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = RestaurantG;
