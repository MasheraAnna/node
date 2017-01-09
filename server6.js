var http = require ('http');
var fs = require ('fs');


// асинхронный ответ сервера
http.createServer(function(req, res){
	var info;
	if (req.url == '/'){
		fs.readFile('index.html', function(err, info){
			if (err) {
				console.error(err);
				res.statusCode = 500;
				res.end('На сервере проихошла ошибка');
				return;
			}
			res.end(info);
		});
	}
}).listen(3000);