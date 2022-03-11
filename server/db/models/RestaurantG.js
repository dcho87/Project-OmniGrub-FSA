const db = require("../db");
const { STRING, INTEGER, TEXT } = db.Sequelize.DataTypes;

const RestaurantG = db.define("restaurantg", {
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
  zipCode: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: TEXT,
  },
  description: {
    type: TEXT,
  },
  category: {
    type: STRING,
  },
});

console.log("hello");
module.exports = RestaurantG;
