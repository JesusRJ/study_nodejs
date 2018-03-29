module.exports.home = function(application, req, res){
  var apiAddress = process.env.API_ADDRESS || "localhost";
  var apiPort = process.env.API_PORT || 8080;
  var address = "http://" + apiAddress + ":" + apiPort + "/api" ;
	res.render('home/padrao', { api_address: address });
}