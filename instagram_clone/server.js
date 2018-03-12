var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb');

var app = express();

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

app.listen(8080);

var db = new mongodb.Db(
  'instagram',
  new mongodb.Server('localhost', 27017, {}),
  {}
);

console.log("Servidor escutando na porta 8080.");

app.get('/', function(req, res){
  res.send({msg: 'Olá'});
});

app.post('/api', function(req, res){
  
  var dados = req.body;

  db.open(function(err, mongoClient){
    mongoClient.collection('postagens', function(err, collection){
      collection.insert(dados, function(err, records){
        if(err){
          res.json(err);
        } else {
          res.json(records);
        }
        mongoClient.close();
      });
    });
  });

});