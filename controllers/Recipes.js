const Recipes = require('../models/Recipes');

//Controller Method Description format
//@desc A description of what the method does.
//@route  HTTP Request Type: URL Endpoint
//@Access Authorization level to access specific method

//@desc Get all Recipes
//@route  GET /api/v1/recipes
//@Access Public
exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipes.find();
    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

//@desc Get a single Recipe
//@route  GET /api/v1/recipes/:id
//@Access Public
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

//@desc Create a new Recipe
//@route  POST /api/v1/recipes
//@Access Private
exports.createRecipe = async (req, res, next) => {
  //Obtain Data from the CLient
  try {
    const recipe = await Recipes.create(req.body);
    res.status(201).json({
      success: true,
      data: recipe,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Update Recipe
//@route Put /api/v1/recipes/:id
//@Access private
exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(recipe);
    if (!recipe) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: recipe });
  } catch (err) {
    return res.status(400).json({ success: false, data: err });
  }
};

//@desc     Delete Recipe
//@route  DELETE /api/v1/recipes/:id
//@Access Private
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipes.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(401).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: false, data: err });
  }
};
