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
        // Check for repeats
        SavedRecipe.find({ title: req.body.title }, (fail, item) => {
            // if the item already exits
            if (item.length > 0 ) {
                console.log('***********item', item)
                return res.send('recipes already exits')
            }

            SavedRecipe.create(req.body, (error, recipe) => {
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
    db.findById(res.locals.currentUser.id, (err, user) => {
        let saved_id = user.saved.filter(food => {
            return food.title === req.body.title
        })[0]._id;

        user.saved.id(saved_id).remove();
        user.save().then(result => {
            res.status(200).send();
        }).catch(err => {
            res.status(500).send("Save effed up");
        });
    });
})

module.exports = profileRoute;