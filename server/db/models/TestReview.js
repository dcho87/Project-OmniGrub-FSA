const db = require('../db')
const Sequelize = require('sequelize')
const { STRING, INTEGER, DECIMAL, TEXT, DATE, JSON } = Sequelize;

const TestReview = db.define('testReview', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    restaurantId: {
        type: STRING,
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

module.exports = TestReview;