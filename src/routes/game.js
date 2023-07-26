const express = require("express");

const router = express.Router();


// GET:
router.get("/game",(req,res)=>{
    res.render("game");
});


module.exports = router;