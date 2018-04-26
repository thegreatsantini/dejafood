/*  setting up router */
const express = require("express");
const indexRoute = express.Router();
const request = require('request');
const bodyParser = require('body-parser');
const isLoggedIn = require('../middleware/isLoggedIn');

indexRoute.get("/", function (req, res) {
    res.render('index');
});

// indexRoute.get('/ingredients', function(req, res){
//     let query = JSON.stringify(req.query.search)

//     query = query.replace(/\s/g,'+').replace(/,/g,'%2C');
//     console.log(query)//this works
//  https://api.edamam.com/search?app_id=' + process.env.API_ID + '&app_key=' + process.env.API_KEY + '&r=' + recipeAPIUri
//     request(`https://api.edamam.com/search?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&q=${query}&to=100`, function(error, response, body){
//          if (error) {
//          console.log('error')
//      }
//          console.log("#########",body);
//         parsedBody = JSON.parse(body)
//         console.log(parsedBody)
//     })
// })

indexRoute.get('/ingredients', function (req, res) {

    let queryArr = []
    let userQuery;

    userQueryArr = req.query.search.split(',');
    userQuery = userQueryArr.join();
    // userQuery = userQuery.replace(/\s/g,'')

    const recipeUrl = `http://food2fork.com/api/search?key=${process.env.API_KEY}&q=${userQuery}`;

    request(recipeUrl, function (error, response, body) {
        if (error) {
            console.log('***************error***********', error)
        }
        body = JSON.parse(body)
        res.render('searchResults', { recipes: body.recipes })
        // res.json(body)
    });
})



module.exports = indexRoute;