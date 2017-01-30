var log = require('../libs/log')(module);
var config = require('config');
var connect = require('connect');
var async = require('async');
var cookie = require('cookie');
var sessionStore = require('../libs/sessionStore');
var HttpError = require('../error').HttpError;
var User = require('../models/user').User;


	// вот так работает протокол HTTP(S):

	// HTTP(S)
	// browser -> login, password -> server
	// browser <- session_id (coockie) <- server
	// browser -- session_id --> server


	// вот так работает протокол WS:

	// HTTP(S)
	// browser -- session_id--> WSKEY -> server {sid: sid, wskey: wskey, ttl: 60s}
	// WS(S)
	// browser --WSKEY--> server


	// а так не безопасно:

	// WS(S)
	// httpOnly: false -> document.cookie - не безопасно!


function loadSession(sid, callback){
	// sessionStore callback is not quite async style
	sessionStore.load(sid, function(err, session){
		if(arguments.length == 0){
			// no arguments => no session
			return callback(null, null);
		} else {
			return callback(null, session);
		}
	});
}

function loadUser(sid, callback){
	if (!session.user){
		// log.debug("Session %s is anonymus", session.id);
		return callback(null, null);
	}

	//log.debug("retrieving user ", session.user)
	User.findById(session.user, function(err, user){
		if (err) return callback(err);
		if (!user){
			return callback (null, null);
		}
		//log.debug("user fundById result: " + user);
		callback(null, user);
	});
}

module.exports = function(server){
	var io = require('socket.io').listen(server);
	io.set('origins', "localhost:*");
	io.sockets.on('connection', function(socket){	
	});

	io.use(function(socket, next) {
	  var handshakeData = socket.request.headers.cookie;
	  console.log(handshakeData);
	  // make sure the handshake data looks good as before
	  // if error do this:
	    // next(new Error('not authorized');
	  // else just call next
	  next();
	});

	// io.set('authorisation', function(handshake, callback){
	// 	async.waterfall([
			
	// 		// получаем сессии из базы
	// 		function(callback){
	// 			// сделать handshakeData.cookies - объектом c cookie
	// 			// получаем строку с куками. Эту строку нужно разобрать в объект cookie, для этого используем
	// 			// модуль cookie
	// 			handshake.cookies = cookie.parse(handshake.headers.cookie || '');
	// 			// теперь у нас есть объект с куками handshake.cookies
	// 			// теперь получим куку с идентификатором сессии sidCookie
	// 			var sidCookie = handshake.cookies[config.get('session:key')];
	// 			// теперь у нас есть идентификатором сессии, но он подписан (s:QWERTY.SHA).
	// 			// Эту подпись необходимо снять. Подпись была сделана express, 
	// 			// поэтому для ее снятия используем метод экспресса, 
	// 			// а точнее метод connect (connect - живет внутри экспресса)
	// 			var sid = connect.utils.parseSignedCookie(sidCookie, config.get('session:secret'));
	// 			// в результате получили очищенный идентификатор сессии sid

	// 			loadSession(sid, callback);
	// 		},

	// 		function(session, callback){
	// 			if(!session){
	// 				callback(new HttpError(401, "No session"));
	// 			}
  
	// 			handshake.session = session;
	// 			// загружаем юзера
	// 			loadUser(session, callback);
	// 		},

	// 		function(user, callback){
	// 			if (!user){
	// 				callback(new HttpError(403, "Annonymus session may not connect"));
	// 			}

	// 			handshake.user = user;
	// 			callback(null);
	// 		}

	// 	], function(err){
			
	// 		// сообщаем о том, как прошла авторизация

	// 		if (!err){
	// 			return callback(null, true);
	// 		};

	// 		if (err instanceof HttpError){
	// 			return callback(null, false);
	// 		};

	// 		callback(err);
	// 	});
	// });

	// io.sockets.on('connection', function(socket){
	// 	// при соединениее получаем из socket.handshake юзера и любые его данные 
		
	// 	console.log(socket.handshake);
		
	// 	var username = socket.handshake.user.get('username');

	// 	socket.broadcast.emit('join', username);

	// 	socket.on('message', function(text, cb){
	// 		socket.broadcast.emit('message', username, text);
	// 		cb && cb();
	// 	});

	// 	socket.on('disconnect', function(){
	// 		socket.broadcast.emit('leave', username);
	// 	});
	// });

	return io;
};