// Module de chiffrement
const substitutionTable1 = require('../crypto/dico');
const substitutionTable2 = require('../crypto/dico');
const substitutionTableInverse1 = require('../crypto/dico');
const substitutionTableInverse2 = require('../crypto/dico');




// Fonction de substitution 1
function substitutionCipher1(text) {
  if (typeof text !== 'string') {
      console.log(typeof text)
    throw new Error('Le texte doit être une chaîne de caractères.');
  }

  text = text.toLowerCase(); // Convertir le texte en minuscules

  let encryptedText = '';
  for (const char of text) {
    if (substitutionTable1.substitutionTable1[char]) {
      encryptedText += substitutionTable1.substitutionTable1[char];
    } else {
      encryptedText += char;
    }
  }

  return encryptedText;
}
  
  // Fonction de substitution 2
  function substitutionCipher2(text) {
    if (typeof text !== 'string') {
      throw new Error('Le texte doit être une chaîne de caractères.');
    }
    text = text.toLowerCase();
    let encryptedText = '';
    for (const char of text) {
      if (substitutionTable2.substitutionTable2[char]) {
        encryptedText += substitutionTable2.substitutionTable2[char];
      } else {
        encryptedText += char;
      }
    }
  
    return encryptedText;
  }
  

// Fonction de transposition
function transpositionCipher(text) {
    // La transposition consiste à inverser l'ordre des caractères
    return text.split('').reverse().join('');
  }
  
  function transpositionDecipher(text) {
    // Vérifiez d'abord que text est une chaîne de caractères
    if (typeof text === 'string') {
      // La détransposition consiste à inverser à nouveau l'ordre des caractères
      return text.split('').reverse().join('');
      console.log(text)
    } else {
      // Si text n'est pas une chaîne de caractères, vous pouvez renvoyer une erreur ou une valeur par défaut selon vos besoins.
      return 'Erreur : Le texte fourni n\'est pas une chaîne de caractères.';
    }
  }


// Fonction de déchiffrement pour la substitution 1
function substitutionDecipher1(text) {
  
  let decryptedText = '';
  for (const char of text) {
    if (substitutionTableInverse1.substitutionTableInverse1[char]) {
      decryptedText += substitutionTableInverse1.substitutionTableInverse1[char];
    } else {
      decryptedText += char;
    }
  }

  return decryptedText;
}

// Fonction de déchiffrement pour la substitution 2
function substitutionDecipher2(text) {
 

  let decryptedText = '';
  for (const char of text) {
    if (substitutionTableInverse2.substitutionTableInverse2[char]) {
      decryptedText += substitutionTableInverse2.substitutionTableInverse2[char];
    } else {
      decryptedText += char;
    }
  }

  return decryptedText;
}


// Fonction pour chiffrer un message en utilisant les deux substitutions
function encryptMessage(message) {
    const substitutedMessage1 = substitutionCipher1(message);
    const substitutedMessage2 = substitutionCipher2(substitutedMessage1);
    const transposedMessage = transpositionCipher(substitutedMessage2);

    return transposedMessage;
  }
  
  // Fonction pour déchiffrer un message
  function decryptMessage(encryptedMessage) {
    const deTransposedMessage = transpositionDecipher(encryptedMessage);
    const deSubstitutedMessage2 = substitutionDecipher2(deTransposedMessage);
    const deSubstitutedMessage1 = substitutionDecipher1(deSubstitutedMessage2);
    
    return deSubstitutedMessage1;
  }


  module.exports = {
    encryptMessage,
    decryptMessage
};


