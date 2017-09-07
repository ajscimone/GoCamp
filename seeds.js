var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");


var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Great trees"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Very hot"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "High clearance road to get in"
    }
]

function seedDB(){
    //Remove any existing campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        
            //Create seed campgrounds
            data.forEach(function(see){
                Campground.create(see, function(err, campground){
                    if (err){
                        console.log(err);
                    }   
                    
                    else{
                        console.log("created a campground");
                        
                        //create comments
                        Comment.create(
                        {
                                text: "this place is great but I wish it had wifi",
                                author: "Homer"
                            }, function(err, comment){
                                if (err){
                                    console.log(err);
                                }   else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                        });
                    }
                });
            
            });
    });    
}

module.exports = seedDB;