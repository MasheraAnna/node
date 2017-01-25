var express = require('express');
var session = require('express-session');

var http = require ('http');
var path = require('path');
var config = require('config');
var log = require('./libs/log')(module);

var bodyParser = require('body-parser');


var HttpError = require('./error').HttpError;
var mongoose = require('./libs/mongoose');

var app = express();
app.set('port', config.get('port'));

// это настройки шаблонизатора
app.engine('ejs', require('ejs-locals'));

app.set('views', __dirname + '/views');
app.set('view engine', "ejs");


// middlewares

// вот тут ему видимо что-то нужно передать.....??????????????????????????????????

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ключевой вопрос, как при помощи bodyParser записать данные в req.body
// а req - это часть экспреса, интересно?

app.use(express.static(path.join(__dirname, "public")));

const MongoStore = require('connect-mongo')(session);
var store = new MongoStore({ mongooseConnection: mongoose.connection });

app.use(session({
  resave: false,
  saveUninitialized: false,
	secret: config.get('session:secret'),
	name: config.get('session:name'),
	cookie: config.get('session:options'),
	store: store
}));

// app.use(function(req, res, next){
// 	req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1; 
// 	res.send("Visits:" + req.session.numberOfVisits);
// });

app.use(require('./middleware/sendHttpError'));

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

