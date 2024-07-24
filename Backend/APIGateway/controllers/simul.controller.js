const jwt = require('jsonwebtoken');

exports.SignIn = (req, res) => {
  // Données d'exemple pour l'identité et le rôle
  const user = {
    id: 123,
    username: 'utilisateur_fictif',
    role: 'SCH_RD' // Remplacez par le rôle que vous souhaitez simuler
  };

  // Clé secrète pour signer le token (devrait être la même que celle dans votre API)
  const secretKey = 'votre_clé_secrète';

  // Générez le token JWT
  const token = jwt.sign(user, secretKey, { expiresIn: '24h' });

}
