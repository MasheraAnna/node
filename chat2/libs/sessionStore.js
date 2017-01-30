var express = require('express');
var session = require('express-session');
var mongoose = require('./mongoose');


const MongoStore = require('connect-mongo')(session);

var store = new MongoStore({ mongoose_сonnection: mongoose.connection,
							 url: 'mongodb://localhost:27017/chat'});

module.exports = store;

