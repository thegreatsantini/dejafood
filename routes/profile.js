const express = require('express');
const passport = require('../config/passportConfig');
const profileRoute = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const User = ('./models/user');

profileRoute.get('/', isLoggedIn, function(req, res){
    console.log('woah its dark in /profile')
    res.render('profile', {currentUser:res.locals.currentUser});
});


module.exports = profileRoute;