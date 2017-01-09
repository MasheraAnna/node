var http = require('http');

var server = new http.Server(); // Event Emitter
server.listen(1500, '127.0.0.1');

var emit = server.emit;
server.emit = function(event){
	console.log(event);
	emit.apply(server, arguments);
}

server.on('request', function(req, res){
	res.end("Привет, мир!");
})