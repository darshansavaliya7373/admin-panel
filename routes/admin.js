var express = require('express');
const passport = require('passport');
var routes = express.Router();
var AdminController = require('../controller/adminController');
var admin =require('../models/admin')

routes.post('/createsession',passport.authenticate('local',{failureredirect:'/login'}),AdminController.dashboardsession)
routes.get('/',passport.checkAuthentication,AdminController.Admin);
routes.get('/add_admin',passport.checkAuthentication,AdminController.addAdmin);
routes.get('/view_admin',passport.checkAuthentication,AdminController.viewAdmin);
routes.get('/edit_password',passport.checkAuthentication,AdminController.edit_password)
routes.post('/set_new_pass',passport.checkAuthentication,AdminController.set_new_pass)
routes.post('/insertData',admin.uploadAvatar,passport.checkAuthentication, AdminController.insertData);
routes.get('/deleteData/:id',passport.checkAuthentication,AdminController.deleteData);
routes.get('/updateData/:id',passport.checkAuthentication, AdminController.updateData);
routes.post('/editData',passport.checkAuthentication,AdminController.editData);
routes.get('/viewProfile/:id',passport.checkAuthentication, AdminController.viewProfile);
routes.get('/registration', AdminController.registration);
routes.post('/register', AdminController.register);
routes.get('/login', AdminController.login);
routes.post('/Login', AdminController.Login);
routes.get('/lostpassword',AdminController.lostpassword);
routes.post('/checkemail', AdminController.checkemail)
routes.get('/checkotp', AdminController.checkotp);
routes.get('/newpassword', AdminController.newpassword);
routes.post('/check_otp', AdminController.check_otp);
routes.post('/changepass', AdminController.changepass);
routes.get('/admin',passport.checkAuthentication,AdminController.adminrecords)
routes.get('/profile',passport.checkAuthentication,AdminController.profile);
routes.get('/updateprofile/:id',passport.checkAuthentication, AdminController.updateprofile);
routes.post('/editProfile',passport.checkAuthentication, AdminController.editprofile);
// routes.post('/updateProfile',passport.checkAuthentication, AdminController.updateProfile);
routes.get('/logout', function(req, res,next){

    req.logout(function(err){

        if(err){
            console.log(err,"somethin wrong");
           
        }
        return res.redirect('/login')

    })

});




module.exports = routes;