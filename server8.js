var http = require ('http');

http.createServer(function (req,res){
	
	process.nextTick(function() {
		req.on('readable', function() {
			// должен сработать на ближайших данных
		})
	});
}).listen(3000);