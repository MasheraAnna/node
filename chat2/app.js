var express = require('express');
var http = require ('http');
var path = require('path');
var config = require('config');
var log = require('./libs/log')(module);
var bodyParser = require('body-parser');

var app = express();
app.set('port', config.get('port'));

// это настройки шаблонизатора
app.engine('ejs', require('ejs-locals'));

app.set('views', __dirname + '/views');
app.set('view engine', "ejs");


// middlewares
app.use(bodyParser.raw());
app.use(express.static(path.join(__dirname, "public")));


// это тоже видимо middleware
app.get('/', function(req, res, next){
  res.render('index');
})



http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server is listenning on port ' + config.get('port'));
});

