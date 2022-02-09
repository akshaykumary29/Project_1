// import
require("dotenv").config();
const express = require("express");
const database = require("./config/database");

const router = require("./router/router");

const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require("./swagger.json");

const logger = require('../Fundoo/config/logger');
var cors = require('cors')
var expressValidator = require('express-validator');

// start your app
const app = express();

app.use(cors());
app.use(expressValidator());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/", router);

// launching application at particular port
const port = process.env.PORT ;

app.listen(2000, () => {
  console.log(`Application is running on port ${port}`);
  logger.info(`Application is running on port ${port}`);
});


database();