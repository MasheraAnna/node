var http = require('http');
var debug = require ('winston');

var server = http.createServer();

server.on('request', require('./request'));
server.listen(1500);
console.log('Server is running');