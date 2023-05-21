const { urlencoded } = require('express');
var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var port = process.env.PORT || 8009;
var app = express();
var db = require('./config/mongoose');
var passport = require('./config/passport_local_strategy');
const session=require("express-session");
var flash = require('connect-flash');
var custom = require('./config/middle-ware');
var passportJWT=require('./config/passport-jwt-strategy')

app.use(session({

    name:'darshan',
    secret:'developer',
    resave: true,
    saveUninitialized:false,
    cookie:{
        maxAge:100*60*1000
    }

}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(custom.setFlash);
app.use(passport.setAuthenticatedUser)
app.use(express.static('assets'));
app.use(cookieParser());
app.use(urlencoded()); 
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use('/', require('./routes/admin'));
app.use('/category',require('./routes/category'))
app.use('/subcategory',require('./routes/subcategory'))
app.use('/extracategory',require('./routes/extracategory'))
app.use('/products',require('./routes/products'))
app.use('/api',require('./routes/api_routes/api'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
// app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res,next)=>{
    res.render('404');
 });

app.listen(port, function(err){
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log("Server is running on port = "+port);
});