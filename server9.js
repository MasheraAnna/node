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
	filePath = path.normalize(path.join(ROOT, filePath));

<<<<<<< HEAD
	// проверим: путь должен начинаться с root
	if (filePath.indexOf(ROOT) !=0 ){
		res.statusCode = 404;
		res.end("File not found");
		return;
	}

	// проверим, что находится по этому пути:
=======
	// шаг 4 - проверим, что лежит по этому пути
>>>>>>> 948d6a808c990e442939cf5f2b266eac6af6cb0d
	fs.stat(filePath, function(err, stats){
		if (err || !stats.isFile()){
			res.statusCode = 404;
			res.end("File not found");
			return;
		}

		sendFile(filePath, res);
	});
}

<<<<<<< HEAD
function sendFile(filePath, res){
	fs.readfile(filePath, function(err, content){
		if (err) throw err;

		var mime = require('mime')
	})
=======

// Эту функцию использовать нельзя - она плохо подходит для отправки файлов. хорошая функция будет дальше

function sendFile(filePath, res){
	if (err) throw err;

	var mime = require('mime').lookup(filePath);
	res.setHeader('Content-Type', mime + '; charset = utf-8');
	res.end(content);
>>>>>>> 948d6a808c990e442939cf5f2b266eac6af6cb0d
}