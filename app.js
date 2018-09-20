var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    flash            = require("connect-flash"),
    methodOverride   = require("method-override"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds");
    
// var Forecast = require('forecast');
// var forecast = new Forecast({
//   service: 'darksky',
//   key: '74850a9b53f698157db8ee6e8b8c823b',
//   units: 'celcius',
//   cache: true,      // Cache API requests 
//   ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
//     minutes: 27,
//     seconds: 45
//   }
// });
 
        //this does log the correct thing
        // var weatherapi= forecast.get([-33.8683, 151.2086], function(err, weather) {
        // if(err) return console.dir(err);
        // console.log(weather);
        // });


//require routes
var commentRoutes    = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    authRoutes       = require("./routes/index");

//set up database
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.connect("mongodb://anthony:Chill1679!!@ds135514.mlab.com:35514/gocamp", {useMongoClient: true});

app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();    //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "The man in black fled across the desert.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//
//Server Activation
//
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Listening");
});