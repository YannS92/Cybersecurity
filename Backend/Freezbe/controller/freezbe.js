const db = require('../database/freezbe');
const helper = require('../helper');
const config = require('../config');

// Display all the users info with the query for the database
async function getAllFreezbe(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);

  const sql = 'SELECT * FROM Modeles_Freezbe; ';
  const values = [offset, config.listPerPage];

  const rows = await db.query(sql, values);

  const data = helper.emptyOrRows(rows);

  return {data}
}

// Display the specific user with the query for the database
async function getFreezbeById(id, page = 1, perPage=10){

  const offset = (page - 1) * perPage;

  const sql = 'SELECT * FROM Modeles_Freezbe WHERE id=?;';

  const values = [id, offset, perPage];
  const result = await db.query(sql, values);

  const data = helper.emptyOrRows(result);

  return {data}
}

// Modification of a user with the query for the database
async function addFreezbe(freezbe){
  // Preparation of the query
  const sql = `INSERT INTO Modeles_Freezbe 
  SET nom=?, description=?, prix_UHT=?, gamme=?, ingredients=?, grammage=?, Procede_Fabrication_id=? ;`;

const values = [freezbe.nom, freezbe.description, freezbe.prix_UHT, freezbe.gamme, freezbe.ingredients, freezbe.grammage, freezbe.Procedes_Fabrication_id];
const result = await db.query(sql, values);
let message = 'Error in updating the user.';
  if (result.affectedRows) {
    message = 'The user is updated successfully';
  }
  return {message};
}


// Modification of a user with the query for the database
async function updateFreezbe(id, freezbe){
  // Preparation of the query
  const sql = `UPDATE Modeles_Freezbe 
  SET nom=?, description=?, prix_UHT=?, gamme=?, ingredients=?, grammage=?, Procede_Fabrication_id=?
  WHERE id=? ;`;

const values = [freezbe.nom, freezbe.description, freezbe.prix_UHT, freezbe.gamme, freezbe.ingredients, freezbe.grammage, freezbe.Procedes_Fabrication_id, id];
const result = await db.query(sql, values);
let message = 'Error in updating the user.';
  if (result.affectedRows) {
    message = 'The user is updated successfully';
  }
  return {message};
}

// Remove the user with the query
async function deleteFreezbe(id){
  // Preparation of the query
  const sql = 'DELETE  FROM Modeles_Freezbe WHERE id = ?';

  const values = [id];
  const result = await db.query(sql, values);
  let message = 'Error in deleting the user.';
  if (result.affectedRows) {
    message = 'The user is deleted successfully.';
  }

  return {message};
}

module.exports = {
  getAllFreezbe,
  getFreezbeById,
  addFreezbe,
  updateFreezbe,
  deleteFreezbe
}


