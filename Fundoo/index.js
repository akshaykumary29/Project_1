
const express = require("express");
const database = require("./config/database");
// let mongoose = require('mongoose');
// const {TextDecoder, TextEncoder} = require("util");
global.TextEncoder = require("util").TextEncoder;
const router = require("./router/router");

// start your app
const app = express();


app.use(express.json());

app.use('/', router);

// launching application at particular port
app.listen(4000, function () {
  console.log('Application is running at 4000');
});

database();

// mongoose.connect('mongodb+srv://Akshay:akshay@cluster0.onjws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err)=>{
//     if(err){
//       console.log("db error")
//     }
//     else{
//       console.log("db connected successfuly")
//     }
// });