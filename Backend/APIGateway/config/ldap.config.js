const ldap = require('ldapjs');

const ldapClient = ldap.createClient({
    url: 'ldap://ldap.example.com:389', // Remplacez par l'URL de votre serveur LDAP
    bindDN: 'cn=admin,dc=example,dc=com', // Remplacez par le DN de l'utilisateur de liaison
    bindCredentials: 'mot_de_passe', // Remplacez par le mot de passe de l'utilisateur de liaison
});

module.exports = ldapClient;