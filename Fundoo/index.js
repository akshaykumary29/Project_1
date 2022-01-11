// import
require("dotenv").config();
const express = require("express");
const database = require("./config/database");
// let mongoose = require('mongoose');
// const {TextDecoder, TextEncoder} = require("util");
global.TextEncoder = require("util").TextEncoder;
const router = require("./router/router");

const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require("./swagger.json");

const logger = require('../Fundoo/config/logger');

// start your app
const app = express();
// var expressValidator = require('express-validator');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
// app.use(expressValidator());
app.use("/", router);

// launching application at particular port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
  logger.info(`Application is running on port ${port}`);
});


database();