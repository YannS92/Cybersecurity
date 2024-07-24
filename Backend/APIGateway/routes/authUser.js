const express = require('express');
const app = express();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/rdBoard",
    authJwt.isRD,
    controller.rdBoard
  );

  app.get(
    "/testBoard",
    authJwt.isTest,
    controller.testBoard
  );

  app.get(
    "/prodBoard",
    authJwt.isProd,
    controller.prodBoard
  );
};
