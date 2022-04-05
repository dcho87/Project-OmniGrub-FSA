const db = require("../db");
const { STRING, INTEGER, TEXT, DECIMAL } = db.Sequelize.DataTypes;

const RestaurantY = db.define("restauranty", {
  id: {
    type: DECIMAL,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  greviewCounts: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  grating: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  yreviewCounts: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  yrating: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  freviewCounts: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  frating: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zipCode: {
    type: INTEGER,
  },
  address: {
    type: TEXT,
  },
  image: {
    type: TEXT,
  },
  url: {
    type: TEXT,
  },
  category: {
    type: STRING,
  },
  yLat: {
    type: DECIMAL,
  },
});

module.exports = RestaurantY;
