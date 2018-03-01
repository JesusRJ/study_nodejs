// Importação de módulos
var express = require('express');
var expressValidator = require('express-validator');
var consign = require('consign');
var bodyParser = require('body-parser');

// Inicialização e configuração do expres
var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

// Configuração dos middleware
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(expressValidator());

// Consign: include modules automatically in app object
consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .into(app);

// Export de modulos
module.exports = app;