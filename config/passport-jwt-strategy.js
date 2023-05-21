const passport = require('passport');

const JWTstrategy=require('passport-jwt').Strategy

const extractJWT = require('passport-jwt').ExtractJwt

const opt={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'coding'
}

const admin = require('../models/admin');

passport.use(new JWTstrategy(opt,async function(payload,done){

    let adminrecord=await admin.findById(payload._id);
    if(adminrecord){
        return done(null,adminrecord)
    }
    else{
        return done(null,false);
    }

}))


module.exports=passport;