// Importa as configurações do servidor
var app = require('./config/server');

// Configuração da porta
var server = app.listen(3000, function() {
  console.log('Chat Multiroom active on port 3000!');
});

// configuração do websocket.io para mesma porta do servidor
var io = require('socket.io').listen(server);

// Escutar as tentativas de conexão por websocket e estabelecer a conexão
io.on('connection', function(socket){
  console.log('Usuário conectou');

  socket.on('disconnect', function(socket){
    console.log('Usuário desconectou');
  })
});