const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
    try {
      res.send({ token: await User.authenticate(req.body.data) });
    } catch (err) {
      next(err);
    }
});


router.post("/google", async (req, res, next)=>{
    try{
        res.send({token:await User.authenticateGoogle(req.body.data)})
    }catch(err){
        next(err)
    }
})

