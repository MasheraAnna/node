var fs = require('fs');

// fs.ReadStream наследует от stream.Readable
var stream = new fs.ReadStream(__filename, {encoding: 'utf-8'});

stream.on('readable', function(){
	var data = stream.read();
	console.log(data);
});

stream.on('end', function(){
	console.log("THE END");
});

// обработчик ошибок

stream.on('error', function(err){
	if (err.code == 'ENOENT'){
		console.log('файл не найден, попинайте админа, пусть выложит..');
	} else {
		console.error(err);
	}
})