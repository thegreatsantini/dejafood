const express = require('express');
const passport = require('../config/passportConfig');
const profileRoute = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

const bodyParser = require('body-parser')

const db = require('../models/user');
const SavedRecipe = require('../models/savedRecipes')

profileRoute.get('/', isLoggedIn, function (req, res) {
    res.render('profile', { currentUser: res.locals.currentUser });
    console.log(res.locals.currentUser.saved[1])
});

profileRoute.post('/', function (req, res) {

    let newBookmark = {
        title: req.body.title,
        publisher: req.body.publisher,
        image: req.body.image,
        link: req.body.link
    };

    console.log(newBookmark.image);

    db.findById(res.locals.currentUser.id, (err, success) => {

        SavedRecipe.create(req.body, (err, recipe) => {
            if (err) {
                console.log(err)
            }
            console.log(recipe)
            success.saved.push(recipe);
            success.save();
        })
    });
    res.send('success')
})

module.exports = profileRoute;