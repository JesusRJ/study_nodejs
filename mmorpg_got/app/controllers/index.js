module.exports.home = function(application, req, res) {
  res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res) {
  
  var dadosForm = req.body;

  req.assert('usuario', 'Usuário obrigatório').notEmpty();
  req.assert('senha', 'Senha obrigatório').notEmpty();

  var erros = req.validationErrors();

  if(erros) {
    res.render('index', {validacao: erros});
    return;
  }

  res.render('index', {validacao: erros});
}