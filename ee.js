var EventEmitter = repuire('events').EventEmitter;

var server = new EventEmitter;

server.on('request', function(request){
	request.approved = true;
});

server.on('request', function(request){
	console.log(request);
})

server.emit('request', {from: "клиент"});
server.emit('request', {from: "ещё клиент"});