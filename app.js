var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds");


//require routes
var commentRoutes    = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    authRoutes       = require("./routes/index");

//set up database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "The man in black fled across the desert.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));                           //User.authenticate is a method that comes with passport
passport.serializeUser(User.serializeUser());                                   //User.serializeUser and deserialize also come with passport
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
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