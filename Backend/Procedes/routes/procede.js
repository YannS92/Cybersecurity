const express = require("express");
const router = express.Router();
const procedeController = require("../controller/procede");


//Display all procedes
router.get('/', async function(req, res, next) {
  try {
    res.json(await procedeController.getAllProcede(req.query.page));
  } catch (err) {
    console.error(`Error while getting procedes.`, err.message);
    next(err);
  }
});

// Display the specific procede
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await procedeController.getProcedeById(req.params.id,req.query.page));
  } catch (err) {
    console.error(`Error while getting the procede.`, err.message);
    next(err);
  }
});

//Modification of a procede
router.post('/', async function(req, res, next) {
  try {
     res.json(await procedeController.addProcede(req.body));
   } catch (err) {
     console.error(`Error while updating procede`, err.message);
     next(err);
   }
 });

//Modification of a procede
router.put('/:id', async function(req, res, next) {
 try {
    res.json(await procedeController.updateProcede(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating procede`, err.message);
    next(err);
  }
});

//Delete a procede
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await procedeController.deleteProcede(req.params.id));
  } catch (err) {
    console.error(`Error while deleting procede`, err.message);
    next(err);
  }
});

module.exports = router;