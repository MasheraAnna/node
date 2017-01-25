var HttpError = require ("../error").HttpError;

module.exports = function (req, res, next){

	if(!req.session.user){
		// текст ошибки не передается, почему????????????????????
		return next(new HttpError(401, "Вы не авторизованы"));
	}

	next();
};