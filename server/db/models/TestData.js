const db = require('../db')
const Sequelize = require('sequelize')
const { STRING, INTEGER, DECIMAL, TEXT, DATE, JSON } = Sequelize;

const Test = db.define('test', {
    businessId: {
        type: STRING,
    },
    name: {
        type: STRING,
    },
    address: {
        type: STRING,
    },
    city: {
        type: STRING,
    },
    state: {
        type: STRING,
    },
    postalCode: {
        type: INTEGER
    },
    latitude: {
        type: STRING,
    },
    longitude: {
        type: STRING,
    },
    stars: {
        type: DECIMAL 
        // not showing the decimal point
    },
    attributes: {
        type: JSON,
    },
    userId: {
        type: STRING,
    },
    reviewStar: {
        type: DECIMAL,
    },
    reviewText: {
        type: TEXT
    },
    reviewDate: {
        type: STRING
    }
})

module.exports = Test;