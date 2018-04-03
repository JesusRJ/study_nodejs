/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(8080, function(){

  var apiAddress = process.env.API_ADDRESS || "localhost";
  var apiPort = process.env.API_PORT || 8080;
  var api_address = "http://" + apiAddress + ":" + apiPort + "/api" ;
  console.log('Endereço da api', api_address);  
	console.log('Servidor online');
})