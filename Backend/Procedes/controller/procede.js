const db = require('../database/procede');
const helper = require('../helper');
const config = require('../config');

// Display all the users info with the query for the database
async function getAllProcede(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);

  const sql = 'SELECT * FROM Procedes_Fabrication; ';
  const values = [offset, config.listPerPage];

  const rows = await db.query(sql, values);

  const data = helper.emptyOrRows(rows);

  return {data}
}

// Display the specific user with the query for the database
async function getProcedeById(id, page = 1, perPage=10){

  const offset = (page - 1) * perPage;

  const sql = 'SELECT * FROM Procedes_Fabrication WHERE id=?;';

  const values = [id, offset, perPage];
  const result = await db.query(sql, values);

  const data = helper.emptyOrRows(result);

  return {data}
}

// Modification of a user with the query for the database
async function addProcede(procede){
  
  const sql = 'INSERT INTO Procedes_Fabrication (nom, description, modele_freezbe, etapes_et_description) VALUES (?, ?, ?, ?)';
  const values = [procede.nom, procede.description, procede.modele_freezbe, procede.etapes_et_description];
  const result = await db.query(sql, values);
  
  let message = 'Error in adding the procede.';
  
  if (result.affectedRows) {
    message = 'Procede added successfully';
  }
  return {message};
}

// Modification of a user with the query for the database
async function updateProcede(id, procede){
  // Preparation of the query
  const sql = `UPDATE Procedes_Fabrication 
  SET nom=? , description=?, modele_freezbe=?, etapes_et_description=? 
  WHERE id=?`;

const values = [procede.nom, procede.description, procede.modele_freezbe, procede.etapes_et_description, id];
const result = await db.query(sql, values);
let message = 'Error in updating the user.';
  if (result.affectedRows) {
    message = 'The user is updated successfully';
  }
  return {message};
}

// Remove the user with the query
async function deleteProcede(id){
  // Preparation of the query
  const sql = 'DELETE  FROM Procedes_Fabrication WHERE id = ?';

  const values = [id];
  const result = await db.query(sql, values);
  let message = 'Error in deleting the user.';
  if (result.affectedRows) {
    message = 'The user is deleted successfully.';
  }

  return {message};
}

module.exports = {
  getAllProcede,
  getProcedeById,
  addProcede,
  updateProcede,
  deleteProcede
}


