const express = require('express');
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/Recipes');

const router = express.Router();

router.route('/').get(getRecipes).post(createRecipe);
router.route('/:id').get(getRecipe).put(updateRecipe).delete(deleteRecipe);

module.exports = router;
