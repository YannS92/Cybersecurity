const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


const controller = require("../controllers/simul.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  //app.post("/login", controller.SignIn);

  const fakeUsers = [
    { id: 1, username: 'user1', password: 'password1', role: 'SCH_RD' },
    { id: 2, username: 'user2', password: 'password2', role: 'SCH_TEST' },
    { id: 3, username: 'user3', password: 'password3', role: 'SCH_PROD' },
  ];
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Recherchez l'utilisateur dans la liste fictive (vous devrez vérifier dans une vraie base de données)
    const user = fakeUsers.find((u) => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Échec de l\'authentification' });
    }
  
    // Créez un token JWT avec les informations de l'utilisateur
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'votre_clé_secrète', {
      expiresIn: '24h', // Expiration du token en 24 heures
    });
  
    // Vous pouvez également définir des options de cookie HttpOnly pour stocker le token JWT
    res.cookie('jwtToken', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // MaxAge en millisecondes
  
    // Répondez avec le token JWT (cette réponse est factice dans un contexte réel)
  });
};