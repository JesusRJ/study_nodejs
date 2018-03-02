// Importa as configurações do servidor
var app = require('./config/server');

// Configuração da porta
var server = app.listen(3000, function() {
  console.log('Chat Multiroom active on port 3000!');
});

// configuração do websocket.io para mesma porta do servidor
var io = require('socket.io').listen(server);

// Seta uma variável global no express com a instância do
// socket.io. Assim é possível recuperar a variável no 
// controller chat.js
app.set('io', io);

// Escutar as tentativas de conexão por websocket e estabelecer a conexão
io.on('connection', function(socket){
  console.log('Usuário conectou');

  socket.on('disconnect', function(socket){
    console.log('Usuário desconectou');
  });

  socket.on('msgParaServidor', function(data){
    // Reenvia a msg para quem mandou
    socket.emit(
      'msgParaCliente',
      { apelido: data.apelido, mensagem: data.mensagem });

    // Faz o broadcast para os demais clientes
    socket.broadcast.emit(
      'msgParaCliente',
      { apelido: data.apelido, mensagem: data.mensagem });

    // Atualiza a lista de participantes
    if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit(
        'participantesParaCliente',
        { apelido: data.apelido });
  
      socket.broadcast.emit(
        'participantesParaCliente',
        { apelido: data.apelido });
    }

  });

});