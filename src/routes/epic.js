const express = require("express");
const axios = require("axios").default;
const router = express.Router();

const { TOKEN } = process.env;

// https://darkfortun.com/api/CuOeCEMHlwKYISEDkV5y4YsqDOKo7CBw/browse?page=1&count=40
// GET:
router.get("/epic", async (req, res) => {
    let respo = await axios.get(`https://darkfortun.com/api/${TOKEN}/topsales`);
    res.render("index", { "topSales": respo.data["items"].slice(0, 39) });
});

router.get("/browse",async (req, res) => {
    const { count, page } = req.query;
    let respo;
    if (Object.keys(req.query).length == 0) {
        respo= await axios.get(`https://darkfortun.com/api/${TOKEN}/browse?page=1&count=40`);
    }
    else{
        respo = await axios.get(`https://darkfortun.com/api/${TOKEN}/browse?page=${page}&count=${count}`);
    }
    res.render("browse",{"items":respo.data["items"],"lastPage":respo.data["lastPage"]});
});


module.exports = router;