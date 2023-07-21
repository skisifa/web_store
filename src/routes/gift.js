const express = require("express");

const router = express.Router();


// GET:
router.get("/gift",(req,res)=>{
    res.render("gift");
});


module.exports = router;