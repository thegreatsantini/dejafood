/*  setting up router */
const express = require("express");
const indexRoute = express.Router();
const request = require('request');
const bodyParser = require('body-parser');
const isLoggedIn = require('../middleware/isLoggedIn');

// user model
const db = require('../models/user');
const SavedRecipe = require('../models/savedRecipes')

indexRoute.get("/", function (req, res) {
    res.render('index');
});

// let recipeList;
// let savedRecipe

// function saveRecipeList(apiResponse) {
//     recipeList = apiResponse
//     console.log("************", savedRecipe)
// }

indexRoute.get('/ingredients', function (req, res) {

    let userQueryArr = []
    let userQuery;

    userQueryArr = req.query.search.split(',');
    userQuery = userQueryArr.join();
    // userQuery = userQuery.replace(/\s/g,'')

    const recipeUrl = `http://food2fork.com/api/search?key=${process.env.API_KEY}&q=${userQuery}`;

    request(recipeUrl, function (error, response, body) {
        const parsedBody = JSON.parse(body)
        if (error) {
            console.log('***************error***********', error)
          } else if (parsedBody.count === 0) {
             res.render('404')
        }
        body = JSON.parse(body)
        res.render('searchResults', { recipes: body.recipes })
        // saveRecipeList(body.recipes)

    });
})

module.exports = indexRoute;