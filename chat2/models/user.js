var crypto = require('crypto');

var mongoose = require('../libs/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created:{
		type: Date,
		default: Date.now()
	}
});



schema.methods.encryptPassword = function(password){
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

// это virtual attribute
schema.virtual('password')
.set(function(password){
	this._plainPassword = password;
	this.salt = Math.random() + '';
	this.hashedPassword = this.encryptPassword(password);
})
.get(function(){ return this._plainPassword;});

schema.methods.checkPassword = function(password){
	return this.encryptPassword(password) === this.hashedPassword;
};

// посмотри вот это в одном из первых видосов про модули
exports.User = mongoose.model('User', schema);