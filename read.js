var fs = require ('fs');
fs.readFile("kkk", {encoding: 'utf-8'}, function(err, data){
	if (err){
		if (err.code = 'ENOENT'){
			console.error("файл не найден")
		} else {
			console.error(err);
		}
	} else {
		console.log(data);	
	}
});