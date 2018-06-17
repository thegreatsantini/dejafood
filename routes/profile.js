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

    db.findById(res.locals.currentUser.id, (err, success) => {
        SavedRecipe.find({ title: req.body.title }, (fail, item) => {
            // console.log('**item**', item)
            // console.log('**fail**', fail)
            if (fail) {
                return res.status(500).send('Something went wrong')
            }
            if (item) {
                return res.status(400).send('recipes already exits')
            }
            SavedRecipe.create(req.body, (error, recipe) => {
                console.log(recipe)
                if (error) {
                    return res.status(500).send()
                }
                success.saved.push(recipe);
                success.save().then(() => {
                    return res.send('success')
                });
            })
        })
    });
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