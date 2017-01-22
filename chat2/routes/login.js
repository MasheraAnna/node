var User = require ("models").User;
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
				var user = new User()
			}
		}
		], 
		function(err){

		});
	User.findOne({username: username}, function (err, user){
		if (err) return next(err);
		if (user){
			if (user.checkPassword(password)){
				// ... 200
			} else {
				// ... 403 Forbidden
			}
		} else {
			var user = new User({username: username, password: password});
			user.save(function(err){
				if (err) return next (err);
				// 200 OK
			})
		}
	})

	}

