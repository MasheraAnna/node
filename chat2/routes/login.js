var User = require ("../models/user").User;
var HttpError = require('../error').HttpError;
var HttpError = require('../models/user').AuthError;
var async = require ("async");

exports.get = function(req, res){
	  res.render('login');
	};

exports.post = function(req, res, next){
	// объект req.body не спарсился - вот в чем проблема
	var username = req.body.username;
	var password = req.body.password;

	// 1. Получить посетителя с таким Username из базы
	// 2. Такой посетитель найден?
	// 	Да - сверить пароль вызовом user.checkPassword
	//	Нет - создать нового пользователя
	// 3. Авторизация успешна?
	//	Да - сохранить _id пользователя в сессии: session.user = user._id и ответить 200 
	//	Нет - вывести ошибку (403 или другую)

	User.authorize(username, password, function(err, user){
		if(err){
			if (err instanceof AuthError){
				return next(new HttpError(403, err.message));
			} else {
				return next(err);
			}
		}

		req.session.user = user._id;
		res.send({});
	});
}

