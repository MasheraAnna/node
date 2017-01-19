var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var http = require ('http');
var path = require('path');
var config = require('config');
var log = require('./libs/log')(module);

var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var HttpError = require('./error').HttpError;
var mongoose = require('./libs/mongoose');

var app = express();
app.set('port', config.get('port'));

// это настройки шаблонизатора
app.engine('ejs', require('ejs-locals'));

app.set('views', __dirname + '/views');
app.set('view engine', "ejs");


// middlewares


app.use(bodyParser.raw());

app.use(express.static(path.join(__dirname, "public")));

var MongoDBStore = require('connect-mongodb')(session);
var store = new MongoDBStore(
	{

	});

app.use(cookieSession({
	secret: config.get('session:secret'),
	name: config.get('session:name'),
	options: config.get('session:options'),
	store: store
}));

app.use(function(req, res, next){
	req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1; 
	res.send("Visits:" + req.session.numberOfVisits);
});

app.use(require('./middleware/sendHttpError'))

require('./routes')(app);

app.use(function(err, req, res, next){
	if (typeof err == 'number'){
		err = new HttpError(err);
	}
	
	if (err instanceof HttpError){
		res.sendHttpError(err);
	} else {
		if (app.get('env') == 'developement'){
			express.errorHandler(err, req, res, next);
		} else {
			log.error(err);
			err = new HttpError(500);
			res.sendHttpError(err);
		}
	}
})


http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server is listenning on port ' + config.get('port'));
});

