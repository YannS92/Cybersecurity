const db = require('../database/ingredient');
const helper = require('../helper');
const config = require('../config');

// Display all the users info with the query for the database
async function getAllIngredient(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);

  const sql = 'SELECT id, nom, description FROM Ingredients;';
  const values = [offset, config.listPerPage];

  const rows = await db.query(sql, values);

  const data = helper.emptyOrRows(rows);

  return {data}
}

// Display the specific user with the query for the database
async function getIngredientById(id, page = 1, perPage = 10){
  const offset = (page - 1) * perPage;

  const sql = 'SELECT id, nom, description FROM Ingredients WHERE id=?;';

  const values = [id, offset, perPage];
  const result = await db.query(sql, values);

  const data = helper.emptyOrRows(result);

  return {data}
}

// Add a user with the query for the database
async function addIngredient(ingredient){
  
  const sql = 'INSERT INTO Ingredients (nom, description) VALUES (?, ?)';
  const values = [ingredient.nom, ingredient.description];
  const result = await db.query(sql, values);
  
  let message = 'Error in adding the ingredient.';
  
  if (result.affectedRows) {
    message = 'Ingredient added successfully';
  }
  return {message};
}

// Modification of a user with the query for the database
async function updateIngredient(id, ingredient){
  // Preparation of the query
  const sql = `UPDATE Ingredients 
  SET nom=?, description=? 
  WHERE id=?`;

const values = [ingredient.nom, ingredient.description, id];
const result = await db.query(sql, values);
let message = 'Error in updating the ingredient.';
  if (result.affectedRows) {
    message = 'Ingredient updated successfully';
  }
  return {message};
}

// Remove the user with the query
async function deleteIngredient(id){
  // Preparation of the query
  const sql = 'DELETE  FROM Ingredients WHERE id = ?';

  const values = [id];
  const result = await db.query(sql, values);
  let message = 'Error in deleting the ingredient.';
  if (result.affectedRows) {
    message = 'The ingredient is deleted successfully.';
  }

  return {message};
}

module.exports = {
  getAllIngredient,
  getIngredientById,
  addIngredient,
  updateIngredient,
  deleteIngredient
}


