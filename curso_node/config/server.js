var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Express instance
var app = express();

// Setting engine ejs as view modeler
app.set('view engine', 'ejs'); 
app.set('views', './app/views');

// Setting public assets
app.use(express.static('./app/public'));
// Setting body-parser as middleware
app.use(bodyParser.urlencoded({extended: true}));
// Setting express-validator as middleware
// Require cusom validator for Date cause the old validator
// was removed on this version
app.use(expressValidator({
  customValidators: {
    isValidDate: isValidDate
  }
}));

// Consign: include modules automatically in app object
consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .then('config/dbConnection.js')
  .into(app);

module.exports = app;

// https://stackoverflow.com/questions/47056283/typeerror-req-checkbody-optional-isdate-is-not-a-function
function isValidDate(value) {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

  const date = new Date(value);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === value;
}