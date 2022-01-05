// import
require("dotenv").config();
const express = require("express");
const database = require("./config/database");
// let mongoose = require('mongoose');
// const {TextDecoder, TextEncoder} = require("util");
global.TextEncoder = require("util").TextEncoder;
const router = require("./router/router");

// start your app
const app = express();
// var expressValidator = require('express-validator');

app.use(express.json());
// app.use(expressValidator());
app.use("/", router);

// launching application at particular por
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

database();