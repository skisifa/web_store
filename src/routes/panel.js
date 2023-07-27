const express = require("express");
const router = express.Router();

const DB = require("../db/db.js");


const userDB = require("../db/login.json");

function logined(req, res, next){
    if(req.session.login){
        res.redirect("/panel");
    }
    else{
        next();
    }
}
function notYet(req, res, next){
    if(!req.session.login){
        res.redirect("/login");
    }
    else{
        next();
    }
}

router.get("/login",logined, async (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { user, pass } = req.body;
    if(userDB.user == user && userDB.pass == pass){
        req.session.login = true;
        res.redirect("/panel");
    }
    else{
        req.session.login = false;
        res.redirect("/login");
    }
});

router.get("/panel",notYet,async (req, res) => {
    res.render("panel");
});

router.post("/gift",async (req, res) => {
    DB.addToData("gifts",req.body);
    res.send({OK:true});
});

router.post("/account",async (req, res) => {
    DB.addToData("accounts",req.body);
    res.send({OK:true});
});

module.exports = router;