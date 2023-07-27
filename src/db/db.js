
const fs = require("fs");

const PATH_GIFTS = "./src/db/gifts.json";
const PATH_ACCOUNTS = "./src/db/accounts.json";

function rJson(path) {
    const str = fs.readFileSync(path, "utf8");
    return JSON.parse(str);
}
function wJson(path, data) {
    fs.writeFileSync(path, JSON.stringify(data));
}
function rIds(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function addToData(type,data){
    let db;
    let path; 
    if(type == "gifts"){
        path = PATH_GIFTS;
        db = rJson(PATH_GIFTS);
    }
    else{
        path = PATH_ACCOUNTS;
        db = rJson(PATH_ACCOUNTS);
    }
    data["id"] = rIds(8);
    db["items"].push(data);
    wJson(path,db);
}
function deleteItem(type,id){
    let db;
    let path; 
    if(type == "gifts"){
        path = PATH_GIFTS;
        db = rJson(PATH_GIFTS);
    }
    else{
        path = PATH_ACCOUNTS;
        db = rJson(PATH_ACCOUNTS);
    }
    for (let i = 0; i < db["items"].length; i++) {
        if(db["items"][i]["id"] == id ){
            db["items"].splice(i,1);
            console.log(db);
            break;
        }
    }
    wJson(path,db);
}
function getData(type){
    let db; 
    if(type == "gifts"){
        db = rJson(PATH_GIFTS);
    }
    else{
        db = rJson(PATH_ACCOUNTS);
    }
    return db;
}



module.exports = {
    addToData,
    getData,
    deleteItem
}


