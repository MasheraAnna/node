var User = require('./models/user').User;

var user = new User({
	username: "Tester5",
	password: "secret"
});

user.save(function(err, user, affected){
	if (err) console.log(err);

})
