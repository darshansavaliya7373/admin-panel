var mongoose = require('mongoose');
var path = require('path');

var adminSchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    }
});


var category = mongoose.model('category', adminSchema);

module.exports = category;