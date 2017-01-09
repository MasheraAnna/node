var log = require ("./logger")(module);

var db = require("db");
db.connect();

var User = require ("./user");

var vasia = new User("Вася");
var petia = new User("Петя");

vasia.hello(petia);

log(db.getPhrase("Run successful"));
