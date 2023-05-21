var mongoose = require('mongoose');
const multer = require('multer');
var path = require('path');
var AVATAR_PATH = ('/uploads/admin');

var products_schema=mongoose.Schema({

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
    extracategoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'extracategory',
        required:true

    },
    pname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }

})


var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename : function(req, file, cb){
        cb(null, file.fieldname+"-"+Date.now());
    }
});

products_schema.statics.uploadAvatar = multer({
    storage : storage
}).single('avatar');


products_schema.statics.avatarpath = AVATAR_PATH;

var products = mongoose.model('products', products_schema);

module.exports = products;