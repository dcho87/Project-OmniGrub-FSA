const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/:googleId", async (req,res,next)=>{
    try{
        const response = await User.exists(req.params.googleId)
        res.send(response)
    }catch(ex){
        next(ex);
    }
});