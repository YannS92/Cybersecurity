const express = require("express");
const router = express.Router();
const ingredientController = require("../controller/ingredient");


//Display all ingredients
router.get('/', async function(req, res, next) {
  try {
    res.json(await ingredientController.getAllIngredient(req.query.page));
  } catch (err) {
    console.error(`Error while getting ingredients.`, err.message);
    next(err);
  }
});

// Display the specific ingredient
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await ingredientController.getIngredientById(req.params.id,req.query.page));
  } catch (err) {
    console.error(`Error while getting the ingredient.`, err.message);
    next(err);
  }
});

//Add a ingredient
router.post('/', async function(req, res, next) {
  try {
     res.json(await ingredientController.addIngredient(req.body));
   } catch (err) {
     console.error(`Error while adding ingredient`, err.message);
     next(err);
   }
 });

//Modification of a ingredient
router.put('/:id', async function(req, res, next) {
 try {
    res.json(await ingredientController.updateIngredient(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating ingredient`, err.message);
    next(err);
  }
});

//Delete a ingredient
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await ingredientController.deleteIngredient(req.params.id));
  } catch (err) {
    console.error(`Error while deleting ingredient`, err.message);
    next(err);
  }
});

module.exports = router;