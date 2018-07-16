/*  setting up router */
const express = require("express");
const indexRoute = express.Router();
const request = require('request');

indexRoute.get("/", function (req, res) {
    res.render('index');
});

indexRoute.get('/ingredients', function (req, res) {

    let userQueryArr = []
    let userQuery;

    userQueryArr = req.query.search.split(',');
    userQuery = userQueryArr.join();

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
    });
})

module.exports = indexRoute;