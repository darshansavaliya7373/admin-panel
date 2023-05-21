const passport = require('passport');
const passportlocal=require('passport-local').Strategy
const admin = require('../models/admin')
passport.use(new passportlocal({

    usernameField:'email'

},function(email,password,done){

    admin.findOne({email:email},function(err,user){

        if(err){
            console.log('Error',err);
            return done(null,err);
        }

        if(!user  || user.password!=password){

            console.log('invalid');
            return done(null,false);

        }

        return done(null,user);

    })

}))

passport.serializeUser(function(user,done){

   return done(null,user.id)

})

passport.deserializeUser(function(id,done){

    admin.findById(id,function(err,user){

        if(err){
            console.log('Error',err);
        }
        return done(null,user);
    })

})


passport.checkAuthentication=function (req,res,next) {
    
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login')

}

passport.setAuthenticatedUser=function (req,res,next){

    if(req.isAuthenticated())
{
    res.locals.user=req.user;
}
next();
}


module.exports =passport;