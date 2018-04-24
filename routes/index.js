/*  setting up router */
const express = require("express");
const indexRoute = express.Router();
const request = require('request');
const bodyParser = require('body-parser');

indexRoute.get("/", function (req, res) {
    res.render('index');
});

indexRoute.get('/ingredients', function(req, res){
    let query = JSON.stringify(req.query.search)
    
    query = query.replace(/\s/g,'+').replace(/,/g,'%2C');
    console.log(query)//this works
    // 'https://api.edamam.com/search?app_id=' + process.env.API_ID + '&app_key=' + process.env.API_KEY + '&q=' + queryString + '&health=' + healthOption + '&to=100';
    request(`https://api.edamam.com/search?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&q=${query}&to=100`, function(error, response, body){
        if (error) {
            console.log('error')
        }
        // console.log("#########",body);//why are you doing this to me
        // parsedBody = JSON.parse(body)
        // console.log(parsedBody)
        res.send(body);
    })
})

module.exports = indexRoute;