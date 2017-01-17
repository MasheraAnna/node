module.exports = function (req, res, next){
	res.sendHttpError = function(error){
		res.status(error.status);
		if (res.req.headers['x-requested-with']=='XMLHttpRequest'){
			res.json(error);
		} else {
			// layout выводится неправильно - проверь, в чем проблема!!!!!!!!!!!!!
			// посмотри скринкаст по лейаутам - какая-то проблема, путь прописан неправильно.
			res.render("error", {error: error});
		}
	};

	next();
}