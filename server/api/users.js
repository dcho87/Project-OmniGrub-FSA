const router = require('express').Router();
const { models: { User }} = require('../db');

router.get('/', async(req, res, next) => {
    try{
        const users = await User.findAll({
            attributes: [
                'id',
                'email',
                'firstName',
                'lastName',
                'isAdmin'
            ]
        });
        res.json(users);
    } catch(err){
        next(err)
    }
});

module.exports = router;