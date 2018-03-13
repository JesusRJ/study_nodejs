var os = require('os');
var mongo = require('mongodb');

// Empactoa a conexão em uma variável pra que a conexão
// seja feita somente quando necessário. Do contrário é
// feito conexões no inicio da aplicação
var connMongoDB = function() {
  var mongoHost = (os.hostname() == "br-jesusrj" ? "192.168.99.100" : "localhost");
  var db = new mongo.Db(
    'got',
    new mongo.Server(mongoHost, 27017, {}),
    {}
  );

  return db;
}

module.exports = function() {
  return connMongoDB;
}