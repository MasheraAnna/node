var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ 
	name: 'Zildjian'
	});

kitty.save(function (err, kitty, affected) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
    console.log(arguments);
  }
});

console.log(kitty);