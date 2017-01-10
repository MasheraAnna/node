var http = require ('http');
var fs = require ('fs');

new http.Server (function(req, res){
	// res is instance of http ServerResponse < stream.Writable

	if (req.url == '/big.html'){

		var file = new fs.ReadStream('big.html');
		sendFile(file, res);
	}
}).listen(3000);

function sendFile(file, res){
	file.pipe(res);
	file.on('error', function(err){
		res.statusCode = 500;
		res.end("Server error");
		console.error(err);
	});

	// сигнал, что соединение было оборвано

	res.on('close',	function(){
		file.destroy();
	})

}

