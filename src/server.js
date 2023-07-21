require("dotenv").config();
const path = require("path");
const express = require("express");
const requestIp = require("request-ip");
const session = require('express-session');
const cors = require("cors");
const cron = require("node-cron");
const router = require("./routes/epic.js");
const game = require("./routes/game.js");
const gift = require("./routes/gift.js");


const app = express();
const PORT = process.env.PORT || 5544;

//use:
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

// use; public files.
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




//set:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// call routers.
app.use("/",router);
app.use("/",game);
app.use("/",gift);


app.get("/",(req,res)=>{
    res.redirect("/epic");
});

app.listen(PORT,()=>{
    console.log("Listen on PORT: "+PORT);

});