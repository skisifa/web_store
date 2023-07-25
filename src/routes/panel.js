const express = require("express");
const router = express.Router();


router.get("/login", async (req, res) => {
    
    res.render("login");
});



router.get("/panel", async (req, res) => {
    
    res.render("panel");
});


module.exports = router;