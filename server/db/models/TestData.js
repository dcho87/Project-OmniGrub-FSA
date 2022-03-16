const db = require('../db')
const Sequelize = require('sequelize')
const { STRING, INTEGER, DECIMAL, TEXT, DATE, JSON } = Sequelize;

const Test = db.define('test', {
    businessId: {
        type: STRING,
        // primaryKey: true
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
    reviewCounts: {
        type: INTEGER
    }, 
    categories: {
        type: STRING
    }
})

module.exports = Test;