// var mongo = require ('mongodb');
// var mysql = require ('mysql');
var redis = require('redis').createClient();

var fs = require ('fs');


module.exports = function handler(req, res){
	if (req.url == '/'){

		redis.get('data', process.domain.bind(function(err, data){
			//...
			throw new Error ('redis callback');
		}));

		fs.readFile('index.html', function (err, content){
			if (err) throw err;
			res.end(content);
		});
	} else {
		res.statusCode = 404;
		res.end('Not found');
	}
};