var http = require('http');
var url = require ('url');

var server = new http.Server(function (req, res){
	console.log(req.method, req.url);
	var urlParsed = url.parse(req.url, true);
	console.log(urlParsed);

	if (urlParsed,pathname = '/echo' && urlParsed.query.message){
		res.statusCode = 200; // Ok
		res.setHeader('Cache-control', 'no-cach');
		res.end(urlParsed.query.message);
	} else {
		res.statusCode = 404;
		res.end("Page not found");
	};

	console.log(req.headers);

});


server.listen(1500, '127.0.0.1');

