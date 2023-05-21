var mongoose = require('mongoose');
var path = require('path');

var subcategorySchema = mongoose.Schema({
    
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    subcategory : {
        type : String,
        required : true
    }
});


var subcategory = mongoose.model('subcategory', subcategorySchema);

module.exports = subcategory;