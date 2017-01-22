var User = require ("../models/user").User;
var HttpError = require('../error').HttpError;
var async = require ("async");

exports.get = function(req, res){
	  res.render('login');
	};

exports.post = function(req, res, next){
	  var username = req.body.username;
	  var password = req.body.password;

	// 1. Получить посетителя с таким Username из базы
	// 2. Такой посетитель найден?
	// 	Да - сверить пароль вызовом user.checkPassword
	//	Нет - создать нового пользователя
	// 3. Авторизация успешна?
	//	Да - сохранить _id пользователя в сессии: session.user = user._id и ответить 200 
	//	Нет - вывести ошибку (403 или другую)

	async.waterfall([
		function (callback){
			console.log(callback);
			User.findOne({username: username}, callback);
		},
		function(user, callback){
			if (user) {
				if (user.checkPassword(password)){
					callback(null, user);
				} else {
					next(new HttpError(403, "Пароль неверен"));
				}
			} else {
				var user = new User({username: username, password: password});
				user.save(function(err){
				if (err) return next (err);
				callback(null, user);
				});
			}
		}
	], function(err, user){
		if (err) return next(err);
		req.session.user = user._id;
		res.send({});
	});
}

