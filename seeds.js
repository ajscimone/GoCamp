var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");


var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum leo id lectus accumsan, sit amet scelerisque purus consequat. Aliquam orci velit, dictum non viverra a, pellentesque eu ex. Fusce tempus justo non turpis egestas, sit amet egestas lectus gravida. Morbi et nisl libero. Maecenas vitae nunc eu est vestibulum efficitur eu id dui."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum leo id lectus accumsan, sit amet scelerisque purus consequat. Aliquam orci velit, dictum non viverra a, pellentesque eu ex. Fusce tempus justo non turpis egestas, sit amet egestas lectus gravida. Morbi et nisl libero. Maecenas vitae nunc eu est vestibulum efficitur eu id dui."
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