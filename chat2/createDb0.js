var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/chat', function(err, db){
	if (err) throw err;

	var collection = db.collection('test_insert');

	collection.remove({}, function(err, results){
		if (err) throw err;

		collection.insert({a:2}, function(err, docs){
			if (err) throw err;
			
			cursor = collection.find({a:2});
			cursor.toArray(function(err, results){
				console.dir(results);
				db.close();
			})
		});
	});
})