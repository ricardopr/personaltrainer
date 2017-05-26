var express 	= require('express');
var router 		= express.Router();
var psprt 		= require("passport");
var User 		= require("../models/user.js");

router.get('/home',isLoggedin,function(req,res){
	res.render("secret");
});

router.get("/login",function(req,res){
	res.render("index");
});

router.post("/login",psprt.authenticate('local',
{
	successRedirect:'/home',
    failureRedirect:'/login'
}),function(req,res){
});

router.get("/register",function(req,res){
	res.render('register');
});

router.post('/register',function(req,res){
	req.body.password;
	var newUser = new User({username:req.body.username});
	User.Create(newUser,req.body.password,function(err,data){
		if(err)
		{
			//ADD FLASH ========================================
			return res.redirect('/login');
		}
		else
		{
			passport.authenticate("local")(req,res, function(){
				res.redirect("/home");
			})
		}
	})
})

function isLoggedin(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }  
  res.redirect('/login')
};

module.exports = router;
