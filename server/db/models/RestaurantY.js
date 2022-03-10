const db = require("../db");
const { STRING, INTEGER, TEXT } = db.Sequelize.DataTypes;

const RestaurantY = db.define("restauranty",{
    name:{
        type:STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
        }
    },
    reviewCounts:{
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

module.exports = RestaurantY