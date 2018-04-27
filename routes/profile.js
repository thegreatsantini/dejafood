const express = require('express');
const passport = require('../config/passportConfig');
const profileRoute = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

const bodyParser = require('body-parser')

const db = require('../models/user');
const SavedRecipe = require('../models/savedRecipes')

profileRoute.get('/', isLoggedIn, function (req, res) {
    res.render('profile', { currentUser: res.locals.currentUser });
});

profileRoute.post('/', function (req, res) {

    let newBookmark = {
        title: req.body.title,
        publisher: req.body.publisher,
        image: req.body.image,
        link: req.body.link
    };

    // console.log(newBookmark);

    db.findById(res.locals.currentUser.id, (err, success) => {

            SavedRecipe.create(req.body, (err, recipe) => {
                if(err){
                    console.log(err)
                }              
                console.log(recipe)
                success.saved.push(recipe);
                success.save();
            })
        });
        res.send('success')
    })

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