var express = require('express');
var routes = express.Router();
var apicontroller=require('../../controller/api_controller/apicontroller')
var admin =require('../../models/admin')
var passport =require('passport')

routes.get('/',passport.authenticate('jwt',{failureRedirect:'wronglogin'}), apicontroller.userdata)

routes.get('/wronglogin',function(req, res){

    return res.json({'status':200,message:'invalid token'})

})

routes.post('/insertapirecord',admin.uploadAvatar,apicontroller.insertapirecord)

routes.delete('/deleteapirecord/:id',apicontroller.deleteapirecord)

routes.patch('/updateapirecord/:id',admin.uploadAvatar,apicontroller.updateapirecord)

routes.post('/check_login',apicontroller.check_login)

module.exports = routes;