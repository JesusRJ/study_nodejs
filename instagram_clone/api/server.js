var os = require('os'),
  express = require('express'),
	bodyParser = require('body-parser'),
	multiparty = require('connect-multiparty'),
	mongodb = require('mongodb'),
	objectId = require('mongodb').ObjectId,
	fs = require('fs'),
	mv = require('mv');

var app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(multiparty());

// Tratamento de http options (preflight)
app.use(function(req, res, next){

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

var port = process.env.API_PORT || 8080;

app.listen(port);

var databaseHost = process.env.DATABASE_HOST;
var databasePort = process.env.DATABASE_PORT || 27017;

if (databaseHost === undefined){
	var databaseHost = (os.hostname() == "br-jesusrj" ? "192.168.99.100" : "localhost");
}

console.log("Endereço do Banco de dados", databaseHost + ":" + databasePort);

var db = new mongodb.Db(
	'instagram',
	new mongodb.Server(databaseHost, 27017, {}),
	{}
);

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/', function(req, res){

	res.send({msg:'Olá'});
});

//POST (create)
app.post('/api', function(req, res){

	var date = new Date();
	var time_stamp = date.getTime();

	var url_imagem = time_stamp + '_' + req.files.arquivo.originalFilename;
	var path_origem = req.files.arquivo.path;
	var path_destino = './uploads/' + url_imagem;

	mv(path_origem, path_destino, {mkdirp: true}, function(err){
		if (err){
			res.status(500).json({error: err});
		}

		var dados = {
			titulo: req.body.titulo,
			url_imagem: url_imagem
		}

		db.open( function(err, mongoclient){
			mongoclient.collection('postagens', function(err, collection){
				collection.insert(dados, function(err, records){
					if(err){
							res.json(err);
						} else {
							res.json(records);
						}
					mongoclient.close();
				});
			});
		});
	});

});

//GET (ready)
app.get('/api', function(req, res){

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find().toArray(function(err, results){
				if(err){
					res.json(err);
				} else {
					res.json(results);
				}
				mongoclient.close();
			});
		});
	});

});

//GET by ID (ready)
app.get('/api/:id', function(req, res){

	console.log("GET ID >>>>>>>> " + req.params.id);

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find(objectId(req.params.id)).toArray(function(err, results){
				if(err){
					res.json(err);
				} else {
					res.status(200).json(results);
				}
				mongoclient.close();
			});
		});
	});

});

app.get('/imagens/:imagem', function(req, res){

	var img = req.params.imagem;

	fs.readFile('./uploads/' + img, function(err, content){
		if(err){
			res.status(400).json(err);
			return;
		}

		res.writeHead(200,{ 'Content-Type': 'imagem/png' });
		res.end(content);
	});

});

//PUT by ID (update)
app.put('/api/:id', function(req, res){
	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.update(
				{ _id : objectId(req.params.id) },
				{ $push : {
										comentarios: {
											id_comentario : new objectId(),
											comentario    : req.body.comentario
										}
									}
				},
				{},
				function(err, records){
					if(err){
						res.json(err);
					} else {
						res.json(records);
					}

					mongoclient.close();
				}
			);
		});
	});
});

//DELETE by ID (remover)
app.delete('/api/:id', function(req, res){

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.update(
				{},
				{ $pull:{
									comentarios: { id_comentario: objectId(req.params.id) }
								}
				},
				{ multi: true },
				function(err, records){
					if(err){
						res.json(err);
					} else {
						res.json(records);
					}

					mongoclient.close();				
				});
		});
	});

});
