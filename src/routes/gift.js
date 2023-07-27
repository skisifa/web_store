const express = require("express");

const router = express.Router();
const DB = require("../db/db.js");

// GET:
router.get("/gift",(req,res)=>{
    res.render("gift",{"items":DB.getData("gifts")["items"],"CURRENCY":process.env.CURRENCY,"login":req.session.login});
});

router.post("/dgift",(req,res)=>{
    const { id } = req.body;
    DB.deleteItem("gifts",id);
    res.send({OK:true});
});


module.exports = router;