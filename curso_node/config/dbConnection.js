var os = require('os');
var mysql = require('mysql');

var connMysql = function(){
  return mysql.createConnection({
    host: (os.hostname() == "br-jesusrj" ? "192.168.99.100" : "localhost"),
    user: "portal",
    password: "portal",
    database: "portal_noticias"
  });
}

module.exports = function() {
  return connMysql;
}