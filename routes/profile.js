const express = require('express');
const passport = require('../config/passportConfig');
const profileRoute = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

const bodyParser = require('body-parser')

const db = require('../models/user');
const SavedRecipe = require('../models/savedRecipes')

profileRoute.get('/', isLoggedIn, function (req, res) {
    // console.log(res.locals.currentUser)
    res.render('profile', { currentUser: res.locals.currentUser });
});

profileRoute.post('/', function (req, res) {

    let newBookmark = {
        title: req.body.title,
        publisher: req.body.publisher,
        image: req.body.image,
        source: req.body.source
    };

    db.findById(res.locals.currentUser.id, (err, success) => {
        SavedRecipe.create(req.body, (error, recipe) => {
            if (error) {
                res.status(500).send()
            }
            success.saved.push(recipe);
            success.save();
        })
    });
    res.send('success')
})
//////////////////////////////////////////////////////

profileRoute.delete('/', function (req, res) {
    let bookMarkToRemove = {
        title: req.body.title,
        publisher: req.body.publisher,
        image: req.body.image,
        link: req.body.link
    };

    db.findById(res.locals.currentUser.id, (err, user) => {

        let saved_id;

        const removeMe = user.saved.filter(food => {
            return food.title === bookMarkToRemove.title
        })

        saved_id = removeMe[0]._id;


        SavedRecipe.findByIdAndRemove(saved_id, (error, success) => {
            if (error) {
                res.status(500).send()
            }
            res.status(200).send()
        })
        db.findOne({ name: res.locals.currentUser.name }, (fail, loggedInUser) => {
            loggedInUser.saved.id(saved_id).remove()
            loggedInUser.save()
            res.status(200).send()
        })
    })
})

module.exports = profileRoute;