var express         = require("express");
var mongoose        = require("mongoose");
var bodyParser      = require('body-parser'); // See if it's necessary
var psprt           = require("passport");
var psprtLcl        = require("passport-local");
var psprtLclMgnse   = require("passport-local-mongoose");
var User            = require("./models/user");
var app             = express();


var loginRoutes = ('./routes/login.js')
//Need to Create a new mongodb only for the Personal Site
mongoose.connect('mongodb://lfpll:Luiz2812*@cluster0-shard-00-00-ig3pl.mongodb.net:27017,cluster0-shard-00-01-ig3pl.mongodb.net:27017,cluster0-shard-00-02-ig3pl.mongodb.net:27017/personalSite?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

app.set('view engine','html');
app.user(bodyParser.urlencoded({extended:true})) // Add qs-library parsing o body parser
// To be defined what folder is to use
app.use(express.static(__dirname + "/public"));

app.use(require('cookie-session')({
    name: 'prssession',
    keys: ['prs1','prs2','prs3']
})) // Avoid express memory leak, read more about cookies

//Prototype, create or own way of encryption
app.use(psprt.initialize());
app.use(psprt.session());
psprt.use(new psprtLcl(User.authenticate()));
psprt.serializeUser(User.serializeUser());
psprt.deserializeUser(User.deserializeUser());
app.use(loginRoutes);


app.get('/',function(req,res){
    res.redirect('/home');
});

var port = process.env.PORT || 8080
app.listen(port, function(){
    console.log("Server Working");
})
