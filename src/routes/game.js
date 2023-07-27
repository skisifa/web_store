const express = require("express");

const router = express.Router();
const DB = require("../db/db.js");

// GET:
router.get("/game",(req,res)=>{

    res.render("game",{"items":DB.getData("accounts")["items"],"CURRENCY":process.env.CURRENCY,"login":req.session.login});
});

router.post("/daccount",(req,res)=>{
    const { id } = req.body;
    DB.deleteItem("accounts",id);
    res.send({OK:true});
});
module.exports = router;