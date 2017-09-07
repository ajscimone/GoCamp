var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        }
        else{
                res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

//CREATE - add new campground to database
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    //Create and save a new campground
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log("err");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});


//SHOW - shows info on a campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        }
        else{
               res.render("show", {campground: foundCampground}); 
        }
    });
});


//Page not found route
 app.get("*", function(req, res){
     res.send("Sorry, page not found");
 });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Listening");
});