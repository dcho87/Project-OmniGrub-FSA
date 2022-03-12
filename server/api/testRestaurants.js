const router = require('express').Router();
const {
    models: { Test }
} = require('../db');
module.exports = router

router.get('/', async(req, res, next)=>{
    try{
        const restaurants = await Test.findAll({})
        res.send(restaurants)
    } catch (err){
        next(err)
    }
})