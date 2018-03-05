var mongo = require('mongodb');

// Empactoa a conexão em uma variável pra que a conexão
// seja feita somente quando necessário. Do contrário é
// feito conexões no inicio da aplicação
var connMongoDB = function() {
  var db = new mongo.Db(
    'got',
    new mongo.Server('localhost', 27017, {}),
    {}
  );

  return db;
}

module.exports = function() {
  return connMongoDB;
}