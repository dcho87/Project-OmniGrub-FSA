const db = require("../db");
const { STRING, INTEGER, TEXT } = db.Sequelize.DataTypes;

const RestaurantAgg = db.define("restaurantagg",{
    name:{
        type:STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
        }
    },
    reviewCountsG:{
        type:INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    reviewCountsY:{
        type:INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    zipCode:{
        type:INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    address:{
        type:TEXT
    },
    description:{
        type:TEXT
    },
    category:{
        type:STRING
    }
})

module.exports = RestaurantAgg