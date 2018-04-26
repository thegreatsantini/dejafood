const express = require('express');
const passport = require('../config/passportConfig');
const profileRoute = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const User = ('./models/user');
const bodyParser = require('body-parser')

profileRoute.get('/', isLoggedIn, function (req, res) {
    res.render('profile', { currentUser: res.locals.currentUser });
});

// profileRoute.get('/ingredients', isLoggedIn, function (req, res) {
// console.log('logged in')
//     let userQueryArr = []
//     let userQuery;

//     userQueryArr = req.query.search.split(',');
//     userQuery = userQueryArr.join();
//     // userQuery = userQuery.replace(/\s/g,'')

//     const recipeUrl = `http://food2fork.com/api/search?key=${process.env.API_KEY}&q=${userQuery}`;

//     request(recipeUrl, function (error, response, body) {
//         if (error) {
//             console.log('***************error***********', error)
//         }
//         body = JSON.parse(body)
//         res.render('searchResults', { recipes: body.recipes })
//         // const recipeList = res.json(body)
//     });
// })




module.exports = profileRoute;