module.exports.home = function(application, req, res){
  var apiAddress = process.env.API_ADDRESS || "localhost";
  var apiPort = process.env.API_PORT || 8080;
  var api_address = "http://" + apiAddress + ":" + apiPort + "/api" ;
  var images_address = "http://" + apiAddress + ":" + apiPort + "/imagens/" ;
	res.render('home/padrao', { api_address: api_address, images_address: images_address });
}