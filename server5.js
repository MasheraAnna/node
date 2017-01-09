var http = require ('http');
var fs = require ('fs');

http.createServer(function(req, res){
	var info;
	if (req.url == '/'){
		try {
		info = fs.readFileSync('index.html');
		} catch (err) {
			console.error(err);
			res.statusCode = 500;
			res.end("На сервере произошла ошибка");
			return;
		}

		res.end(info);
	} else {
		res.statusCode = 400;
		res.end("Запрашиваемый адрес не существует");
	}
}).listen(3000);