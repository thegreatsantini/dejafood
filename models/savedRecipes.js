const mongoose = require('mongoose');

const savedRecipes = new mongoose.Schema({
    publisher: String,
    title: String,
    source: String,
    image: String
})



module.exports = mongoose.model('SavedRecipe', savedRecipes);