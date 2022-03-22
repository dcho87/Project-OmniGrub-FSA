const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/:googleId", async (req,res,next)=>{
    try{
        console.log("THIS IS REQ.PARAMS", req.params)
        const response = await User.exists(req.params.googleId)
        console.log("THIS IS THE RESPONSEEEEEEEEEE", response)
        res.send(response)
    }catch(ex){
        next(ex);
    }
});