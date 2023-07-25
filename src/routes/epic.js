const express = require("express");
const axios = require("axios").default;
const router = express.Router();

const { TOKEN } = process.env;

// https://darkfortun.com/api/CuOeCEMHlwKYISEDkV5y4YsqDOKo7CBw/browse?page=1&count=40
// GET:
router.get("/epic", async (req, res) => {
    let respo = await axios.get(`https://darkfortun.com/api/${TOKEN}/topsales`);
    res.render("index", { "topSales": respo.data["items"].slice(0, 40) });
});

router.get("/browse", async (req, res) => {
    const { count, page, search } = req.query;
    let respo;
    let searchedData = null;
    if (Object.keys(req.query).length == 0) {
        respo = await axios.get(`https://darkfortun.com/api/${TOKEN}/browse?page=1&count=40`);
        if(search != undefined){
            searchedData = await axios.get(`https://darkfortun.com/api/${TOKEN}/search/${search}`);
        }
    }
    else if (Object.keys(req.query).length == 1) {
        respo = await axios.get(`https://darkfortun.com/api/${TOKEN}/browse?page=1&count=40`);
        if(search){
            searchedData = await axios.get(`https://darkfortun.com/api/${TOKEN}/search/${search}`);
        }
    }
    else {
        respo = await axios.get(`https://darkfortun.com/api/${TOKEN}/browse?page=${page}&count=${count}`);
    }
    
    res.render("browse", { "items": (searchedData == null) ? respo.data["items"] : searchedData.data, "lastPage": respo.data["lastPage"] , "phoneNumber":process.env.PHONE});
});


module.exports = router;