var express = require('express');
var http = require ('http');
var path = require('path');
var config = require('config');
var log = require('./libs/log')(module);

var app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server is listenning on port ' + config.get('port'));
});

// Middleware

app.use(function(req, res, next){
  if (req.url == '/'){
    res.end('Hello');
  } else {
    next();
  }
});

app.use(function(req, res, next){
  if (req.url == '/forbidden'){
    next(new Error('woops, denied'));
  } else {
    next();
  }
});

app.use(function(req, res, next){
  if (req.url == '/next'){
    res.end('Next');
  } else {
    next();
  }
});


app.use(function(err, req, res, next){
  // NODE_ENV = 'production';
  if (app.get('env')=='developement'){
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else {
    res.send(500, "Нет доступа");
  }
});


app.use(function(req, res){
  res.send(404, 'Page not found, sorry');
});

