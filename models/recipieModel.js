const mongoose = require('mongoose');

const recipieSchema = new mongoose.Schema({
  name: String,
  category: String,
  recipie: String,
  comment: String
});

const Recipe = mongoose.model('recipies', recipieSchema);

module.exports = Recipe;