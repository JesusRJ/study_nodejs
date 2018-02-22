var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs'); 
app.set('views', './app/views');

// Setting body-parser
app.use(bodyParser.urlencoded({extended: true}));

consign()
  .include('app/routes')
  .then('app/models')
  .then('config/dbConnection.js')
  .into(app);

module.exports = app;