//  ===========
// AUTH ROUTES
//  ===========

var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Landing route
router.get("/", function(req, res){
    res.render("landing");
});


// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});                      //here we make a new user
    User.register(newUser, req.body.password, function(err, user){              //and register them
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){                    //and then we authenticate and log them in
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// handling login logic
router.post("/login", passport.authenticate("local",                               //here we just authenticate and log them in
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});


//Middleware function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;