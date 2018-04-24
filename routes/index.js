/*  setting up router */
const express = require("express");
const indexRoute = express.Router();

indexRoute.get("/", function (req, res) {
    res.render('index');
});

indexRoute.get('/homepage', function(req,res){
    res.render('home')
})

module.exports = indexRoute;