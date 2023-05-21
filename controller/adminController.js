var Admin = require('../models/admin');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');
// const admin = require('../models/admin');

module.exports.dashboardsession = function(req,res){

    req.flash('success','login successfully');
    return res.redirect('/');
    
    
}
module.exports.Admin = function(req,res)
{
    return res.render('dashboard');
}


module.exports.addAdmin = function(req,res)
{
    return res.render('add_admin');
}

module.exports.viewAdmin = function(req,res)
{
    Admin.find({}, function(err, record){
        if(err)
        {
            console.log(err);
            return false;
        }
        return res.render('view_admin', {
            data : record
        });
    });
}

module.exports.insertData = function(req,res)
{
    Admin.uploadAvatar(req, res, function(){ 
        var name =  req.body.fname+" "+req.body.lname;
        if(req.file){
            imgPath = Admin.avatarpath+"/"+req.file.filename;
        }
        Admin.create({
            name : name,
            email : req.body.email,
            password : req.body.password,
            gender : req.body.gender,
            hobby : req.body.hobby,
            city : req.body.city,
            description : req.body.description,
            avatar : imgPath
        }, function(err){
            if(err)
            {
                console.log(err);
                return false;
            }
        });
        req.flash('success','data added successfully');

        return res.redirect('/view_admin');
    });
}


module.exports.checkotp = function(req,res){

    return res.render('checkotp')

}
module.exports.newpassword=function(req,res){

    return res.render('newpassword')
    

}
module.exports.check_otp = function(req,res){

    console.log(req.body.otp);
    if(req.body.otp == req.cookies.otp){

     return res.redirect('/newpassword')
    }
    else{
        req.flash('success','otp not match');     
       return res.redirect('checkotp');

    }


}

module.exports.changepass = function(req,res){

    console.log(req.body);
    if(req.body.npass == req.body.cpass){

        Admin.findOne({email : req.cookies.email}, function(err, record){

            if(err){
                console.log(err);
                return res.redirect('back');
            }
            if(record){

                Admin.findByIdAndUpdate(record.id, {
                    password : req.body.npass
                }, function(err)
            {
                if(err){
                    console.log(err);
                    return res.redirect('back');
                    
                }
                else{
                    req.flash('success','password changed successfully');
                    res.cookie('otp','')
                    res.cookie('email','')
                    return res.redirect('/logout');
                    
                }
            })
            }

        })
    }
    else{
        req.flash('success','new password and confirm not match')
        res.redirect('newpassword');
        
    }
}


module.exports.deleteData = function(req,res)
{
    var id = req.params.id;
    Admin.findById(id, function(err, record){ 
        if(record.avatar)
        {
            fs.unlinkSync(path.join(__dirname,"..",record.avatar));
        }
        Admin.findByIdAndDelete(id, function(err,data){
            if(err)
            {
                console.log(err);
                return false;
            }
            req.flash('success','data deleted successfully');
            return res.redirect('/view_admin');
        });
    });
}

module.exports.updateData = function(req,res){
    Admin.findById(req.params.id, function(err, record){
        if(err)
        {
            console.log(err);
            return false;
        }
        return res.render('update', {
            data : record
        });
    });
}

module.exports.editData = function(req, res){
    Admin.uploadAvatar(req, res, function(){
   
      
        if(req.file){
            Admin.findById(req.body.Id, function(err, data){
                if(err)
                {
                    console.log(err);
                    return false;
                }
                if(data.avatar)
                {
                    fs.unlinkSync(path.join(__dirname,"..",data.avatar));
                }
                var imgPath = Admin.avatarpath+"/"+req.file.filename;
                Admin.findByIdAndUpdate(req.body.Id, {
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    gender : req.body.gender,
                    hobby : req.body.hobby,
                    city : req.body.city,
                    description : req.body.description,
                    avatar : imgPath,
                }, function(err){
                    if(err)
                    {
                        console.log(err);
                        return false;
                    }
                    req.flash('success','data updated successfully');
                    return res.redirect('/view_admin');
                });
            });
        }
        else{
            Admin.findById(req.body.Id, function(err, data){
                console.log(req.file);
                if(err)
                {
                    console.log(err);
                    return false;
                }
                if(data.avatar)
                {
                    imgPath = data.avatar;
                }
                Admin.findByIdAndUpdate(req.body.Id, {
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    gender : req.body.gender,
                    hobby : req.body.hobby,
                    city : req.body.city,
                    description : req.body.description,
                    avatar : imgPath,
                }, function(err){
                    if(err)
                    {
                        console.log(err);
                        return false;
                    }
                    return res.redirect('/view_admin');
                });
            });
        }
    });
}

module.exports.viewProfile = function(req, res){
    Admin.findById(req.params.id, function(err, data){
        // console.log(data);
        if(err)
        {
            console.log(err);
            return false;
        }
        res.render('viewProfile', {
            profile : data
        });
    });
}

module.exports.lostpassword = function(req, res){
    
    return res.render('lostpassword')

}

module.exports.checkemail = function(req, res){

    console.log(req.body.email,'=email');
    Admin.findOne({email: req.body.email},function(err, userdata){

        if(err){
            console.log(err);
            return false;
        }
        if(userdata){
            var otp = Math.ceil(Math.random()*100000)
            var transport = nodemailer.createTransport({
                // host: "sandbox.smtp.mailtrap.io",
                // port: 2525,
                service:'gmail',
                auth: {
                  user: "darshansavaliya41@gmail.com",
                  pass: "dtsycixptxrqaexh"
                }
              });
              let info=transport.sendMail({
                from:'darshansavaliya41@gmail.com',
                to:userdata.email,
                subject:'testing darshan',
                text:'hello my name is darshan',
                html:`<b>otp:${otp}</b>`
              });
              res.cookie('otp',otp);
              res.cookie('email',userdata.email);
              req.flash('success','otp forwarded to your email');
        return res.redirect('/checkotp');
        }
    })

}



module.exports.profile = function(req, res){

    return  res.render('profile')

}
module.exports.updateprofile = function(req, res){

   Admin.findById(req.params.id,function(err,data){

    if(err){
        console.log(err);
        return false;
    }
    return res.render('editprofile',{
        data:data
    });

   })

}

module.exports.editprofile = function(req, res){
    console.log(req.file);
    Admin.uploadAvatar(req, res, function () {
  
        if (req.file) {
            Admin.findById(req.user, function (err, record) {
                if (err) {
                    console.log("Something wrong");
                    return false;
                }

                if (record.avatar) {
                    fs.unlinkSync(path.join(__dirname, '..', record.avatar));
                }
                var imagePath = Admin.avatarpath+"/"+req.file.filename;
                // var imagePath = "/" + Admin.avatarPath + "/" + req.file.filename;
                req.body.avatar = imagePath;
                Admin.findByIdAndUpdate(req.user,
                    req.body,
                    function (err, record) {
                        if (err) {
                            console.log("record not updated", err);
                            return false;
                        }
                        return res.redirect('/profile');
                    })
            })
        }
        else {
            Admin.findById(req.user, function (err, record) {
                if (err) {
                    console.log("Record not found");
                    return false;
                }

                var imagePath = '';
                if (record.avatar) {
                    imagePath = record.avatar;
                }
                req.body.avatar = imagePath;
                Admin.findByIdAndUpdate(req.user,
                    req.body,
                    function (err, record) {
                        if (err) {
                            console.log("record not updated", err);
                            return false;
                        }
                        return res.redirect('/profile');
                    })
            })
        }
    })

}







module.exports.registration = (req, res) =>
{
    res.render('registration');
}

module.exports.login = (req, res) =>
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    res.render('login');
}

module.exports.register = (req, res) =>
{
    Admin.findOne({email : req.body.email}, function(err, data){
        if(err)
        {
            console.log(err);
            return false;
        }
        if(data)
        {
            console.log("Already registr.");
            return res.redirect('back');
        }
        else{
            if(req.body.password == req.body.cpassword)
            {
                Admin.create({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    gender : 'null',
                    city : 'null',
                    description : 'null',
                    hobby : [],
                    avatar : ''
                }, function(err, data){
                    if(err)
                    {
                        console.log(err);
                        return false;
                    }
                    return res.redirect('login');
                });
            }
            else{
                console.log("Password not match");
                return res.redirect('back');    
            }
        }
    });
}

module.exports.Login = (req, res) => {
    Admin.findOne({email : req.body.email}, function(err, data){
        if(err)
        {
            console.log(err);
            return false;
        }
        if(data)
        {
            if(data.password == req.body.password)
            {
                res.cookie('adminId',data.id);
                res.cookie('admin',data);
                res.redirect('/');
            }
           
            else{
                console.log("Invalid password.");
                res.redirect('/login');
            }
        }
        else{
            console.log("Invalid email.");
            res.redirect('/login');
        }
    });
}


module.exports.edit_password = function(req,res){
    return res.render('edit_password');
}

module.exports.set_new_pass = function(req,res){
  
    var oldpass = req.user.password;
    var cpass = req.body.cpass;
    var npass = req.body.npass;
    var copass = req.body.copass;
    if(oldpass ==cpass){
        if(cpass != npass)
        {
            if(npass == copass){
                Admin.findByIdAndUpdate(req.user.id,{
                    password : npass
                },function(err,passUpdated){
                    if(err){
                        console.log("somethign wrong");
                        return res.redirect('back');
                    }
                    return res.redirect('/logout')
                })
            }
            else{
                console.log("new & confirm  password not match");
                return res.redirect('back');
            }
        }
        else{
            console.log("current or new password are match");
            return res.redirect('back');
        }
    }
    else{
        console.log("current password not match");
        return res.redirect('back');
    }
}

module.exports.adminrecords=async (req,res)=>{

    // records=await Admin.find({});
    // if(records){
    //     return res.json({red:records})
    // }
    
        return res.json({red:req.user})
}