// это roots (маршруты)

var User = require('../models/user').User;
var HttpError = require ('../error').HttpError;
var ObjectId = require ('mongodb').ObjectId;

module.exports = function(app){

	app.get('/', require('./frontpage').get);

	app.get('/users',function(req, res, next){
		User.find({}, function(err, users){
			if (err) return next(err);
			res.json(users);
		})
	});

	app.get('/user/:id', function(req, res, next){
		try {
			var id = new ObjectId(req.params.id);
		} catch (e) {
			return next(404);
		};

		User.findById(id, function(err, user){

			if (!user){
				next(new HttpError(404, 'User not found'));
			}
			
			if (err) return next(err);
			
			res.json(user);
		});
	});
}