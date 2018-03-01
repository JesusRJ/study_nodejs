module.exports.iniciaChat = function(application, req, res){
  
  var dadosForm = req.body;

  req.assert('apelido', 'Nome ou apelido obrigatório').notEmpty();
  req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

  var errors = req.validationErrors();

  if (errors){
    res.render("index", {validacao: errors});
    return;
  }

  res.render("chat");
}