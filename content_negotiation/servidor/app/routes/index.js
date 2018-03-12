module.exports = function(application){
	
  application.get('/', function(req, res){
    // Respondendo o formato adequado html/json/xml
    res.render('adf');
    res.format({
      'text/plain': function(){
        res.send('Bem vindo a sua app NodeJS!');
      },

      'text/html': function(){
        res.send('Bem vindo a sua app NodeJS!');
      },

      'json': function(){
        var retorno = {
          body: 'Bem vindo a sua app NodeJS!'
        }

        res.json(retorno);
      },

      'default': function(){
        res.status(406).send('Not Acceptable');
      }
    });
	});

  application.post('/', function(req, res){
    var dados = req.body;
    res.send(dados);
  });

}