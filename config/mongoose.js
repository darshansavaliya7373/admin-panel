var mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/admin-panel");

var db = mongoose.connection;

db.once('open', function(err){
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log("Db is connected.");
});

module.exports = db;