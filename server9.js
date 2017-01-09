var http = require('http');
var fs = require ('fs');
var url = require ('url');
var path = require ('path');

var ROOT = __dirname + "/public";

http.createServer(function(req, res){

	if (!checkAccess(req)){
		res.statusCode = 403;
		res.end("Tell me the secret to access!");
		return;
	}

	sendFileSafe(url.parse(req.url).pathname, res);

}).listen(3000);

function checkAccess(req){
	return url.parse(req.url, true).query.secret == 'o_O';
}

// пример безопасной работы с путем от посетителя

function sendFileSafe(filePath, res){

	// шаг 1 - раскодируем путь, полученный от браузера
	try {
		filePath = decodeURIComponent(filePath);
	} catch (e) {
		res.statusCode = 400;
		res.end("Bad Request");
		return;
	}

	// шаг 2 - проверка на безопасность: нужно проверить, есть ли в строке нулевой байт
	if (~filePath.indexOf('\0')){
		res.statusCode = 400;
		res.end("Bad Request");
		return;
	}
	// шаг 3 - получаем полный путь для работы с файлом
	

}