const express = require("express");
const router = express.Router();
const freezbeController = require("../controller/freezbe");


//Display all freezbes
router.get('/', async function(req, res, next) {
  try {
    res.json(await freezbeController.getAllFreezbe(req.query.page));
  } catch (err) {
    console.error(`Error while getting freezbes.`, err.message);
    next(err);
  }
});

// Display the specific freezbe
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await freezbeController.getFreezbeById(req.params.id,req.query.page));
  } catch (err) {
    console.error(`Error while getting the freezbe.`, err.message);
    next(err);
  }
});

//Modification of a freezbe
router.post('/', async function(req, res, next) {
  try {
     res.json(await freezbeController.addFreezbe(req.body));
   } catch (err) {
     console.error(`Error while updating freezbe`, err.message);
     next(err);
   }
 });

//Modification of a freezbe
router.put('/:id', async function(req, res, next) {
 try {
    res.json(await freezbeController.updateFreezbe(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating freezbe`, err.message);
    next(err);
  }
});

//Delete a freezbe
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await freezbeController.deleteFreezbe(req.params.id));
  } catch (err) {
    console.error(`Error while deleting freezbe`, err.message);
    next(err);
  }
});

module.exports = router;