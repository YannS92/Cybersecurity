const ldap = require('ldapjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.SignIn = (req, res) => {
  const bindDN = req.body.bindDN;
  const password = req.body.password;

  const ldapClient = ldap.createClient({
    url: 'ldap://votre-serveur-ldap'
  });

  ldapClient.bind(bindDN, password, (err) => {
    if (err) {
        console.error('Échec de l\'authentification :', err);
        res.status(401).send({ message: 'Échec de l\'authentification' });
    } else {
        console.log('Authentification réussie');

        ldapClient.search('baseDN', {
            filter: '(uid=' + bindDN + ')', // Remplacez 'uid' par l'attribut utilisé pour identifier l'utilisateur
        }, (searchErr, searchRes) => {
            if (searchErr) {
                console.error('Erreur de recherche LDAP :', searchErr);
                res.status(500).send({ message: 'Erreur de recherche LDAP' });
            } else {
                // Traitez les résultats de la recherche ici
                searchRes.on('searchEntry', (entry) => {
                // Extrait le rôle de l'utilisateur de l'entrée LDAP
                const userRole = entry.object.roleAttribute; // Remplacez 'roleAttribute' par l'attribut réel contenant le rôle
                console.log('Rôle de l\'utilisateur :', userRole);
            
                // Générez ensuite le jeton JWT avec le rôle extrait
                var userToken = jwt.sign({ bindDN, role: userRole }, config.secret, {
                    expiresIn: 86400 // 24 heures
                });
            
                // Créez un cookie HttpOnly pour stocker le token JWT
                res.cookie('jwtToken', userToken, { httpOnly: true });
                res.status(200).send({ message: 'Authentification réussie' });
                });
            
                searchRes.on('error', (error) => {
                console.error('Erreur de recherche LDAP :', error);
                res.status(500).send({ message: 'Erreur de recherche LDAP' });
                });
            }
        });
    }
  });
};