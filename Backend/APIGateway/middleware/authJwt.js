const jwt = require("jsonwebtoken");

isRD = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    return res.status(401).json({ message: 'Token absent' });
  }

  try {
    const decodedToken = jwt.verify(jwtToken, 'votre-secret-jwt');
    const userRole = decodedToken.role;

    // Vous pouvez maintenant utiliser userRole pour gérer les accès
    if (userRole === 'SCH_RD') {
      // Accès autorisé pour les administrateurs
      res.json({ message: 'Accès autorisé' });
    } else {
      res.status(403).json({ message: 'Accès interdit' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

isTest = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    return res.status(401).json({ message: 'Token absent' });
  }

  try {
    const decodedToken = jwt.verify(jwtToken, 'votre-secret-jwt');
    const userRole = decodedToken.role;

    // Vous pouvez maintenant utiliser userRole pour gérer les accès
    if (userRole === 'SCH_TEST') {
      // Accès autorisé pour les administrateurs
      res.json({ message: 'Accès autorisé' });
    } else {
      res.status(403).json({ message: 'Accès interdit' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

isProd = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    return res.status(401).json({ message: 'Token absent' });
  }

  try {
    const decodedToken = jwt.verify(jwtToken, 'votre-secret-jwt');
    const userRole = decodedToken.role;

    // Vous pouvez maintenant utiliser userRole pour gérer les accès
    if (userRole === 'SCH_PROD') {
      // Accès autorisé pour les administrateurs
      res.json({ message: 'Accès autorisé' });
    } else {
      res.status(403).json({ message: 'Accès interdit' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};


module.exports = isRD; isTest, isProd;
