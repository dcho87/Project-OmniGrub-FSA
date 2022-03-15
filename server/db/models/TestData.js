const db = require('../db')
const Sequelize = require('sequelize')
const { STRING, INTEGER, DECIMAL } = Sequelize;

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
    }
    // attributes could be seeded too
})

module.exports = Test;