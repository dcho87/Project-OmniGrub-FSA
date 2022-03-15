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

router.get('/:id', async(req, res, next)=>{
    try{
        res.send(await Test.findByPk(req.params.id))
    } catch(err){
        next(err)
    }
})