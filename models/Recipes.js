const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});
const RecipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxLength: [100, 'Name cannot be more than 100 characters.'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxLength: [500, 'Description cannot be more than 500 characters'],
  },
  ingredients: [ingredientsSchema],
  steps: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipes', RecipesSchema);
