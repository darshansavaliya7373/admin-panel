var mongoose = require('mongoose');
// var path = require('path');

var extracategoryschema=mongoose.Schema({

    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    subcategoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory',
        required:true
    },
    extracategory:{
        type:String,
        require:true

    }

})

var extracategory = mongoose.model('extracategory', extracategoryschema);

module.exports = extracategory;