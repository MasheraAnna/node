var util = require ('util');
var phrases = {
	"Hello": "Привет",
	"world": "мир"
}

function PhraseError(message){
	this.message = message;
	Error.captureStackTrace(this, PhraseError);
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = "PhraseError";

function HttpError(status, message){
	this.status = status;
	this.message = message;
	Error.captureStackTrace(this, HttpError);
}

util.inherits(HttpError, Error);
HttpError.prototype.name = "HttpError";

function getPhrase (phrase){
	if (!phrases[phrase]){
		throw new PhraseError ("Нет такой фразы: " + phrase);
	}
	return phrases[phrase];
}

function makePage(url){
	if ( url != 'index.html'){
		throw new HttpError (404, "Нет такой страницы"); // HTTP 404
	}
	return util.format("%s, %s!", getPhrase("Hllo"), getPhrase("world"));
}

try {
	var page = makePage('index.html');
	console.log(page);
} catch (e) {
	if (e instanceof HttpError){
		console.log(e.status, e.message);
	} else {
		
		console.error("Ошибка %s\n сообщение: %s\n стек: %s", e.name, e.message, e.stack);
	}
}

var page = makePage("index.html");
