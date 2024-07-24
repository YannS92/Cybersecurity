const crypto = require('crypto');
const sql = require('mssql');

// Configuration de la base de données SQL Server
const config = {
  user: 'votre_utilisateur',
  password: 'votre_mot_de_passe',
  server: 'votre_serveur_sql',
  database: 'votre_base_de_donnees',
  options: {
    encrypt: true, // Activer le chiffrement de la connexion (si nécessaire)
  },
};

// Fonction de chiffrement
function encrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encryptedText = cipher.update(text, 'utf8', 'hex');
  encryptedText += cipher.final('hex');
  return encryptedText;
}

// Fonction de déchiffrement
function decrypt(encryptedText, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decryptedText = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedText += decipher.final('utf8');
  return decryptedText;
}

// Fonction pour insérer des données chiffrées dans la base de données
async function insertEncryptedData(dataToInsert, encryptionKey) {
  try {
    await sql.connect(config);
    const encryptedData = encrypt(dataToInsert, encryptionKey);
    const request = new sql.Request();
    const query = `INSERT INTO VotreTable (ChampChiffre) VALUES ('${encryptedData}')`;
    await request.query(query);
    console.log('Données chiffrées insérées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données chiffrées :', error);
  } finally {
    sql.close();
  }
}

// Fonction pour récupérer et déchiffrer des données depuis la base de données
async function retrieveAndDecryptData(encryptionKey) {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const query = 'SELECT ChampChiffre FROM VotreTable WHERE conditions_de_filtrage';
    const result = await request.query(query);
    if (result.recordset.length > 0) {
      const encryptedData = result.recordset[0].ChampChiffre;
      const decryptedData = decrypt(encryptedData, encryptionKey);
      console.log('Données déchiffrées :', decryptedData);
    } else {
      console.log('Aucune donnée trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération et du déchiffrement des données :', error);
  } finally {
    sql.close();
  }
}

// Exemple d'utilisation
const encryptionKey = 'votre_cle_de_chiffrement';
const dataToInsert = 'Les données confidentielles que vous souhaitez stocker';

// Insérer des données chiffrées dans la base de données
insertEncryptedData(dataToInsert, encryptionKey);

// Récupérer et déchiffrer des données depuis la base de données
retrieveAndDecryptData(encryptionKey);
