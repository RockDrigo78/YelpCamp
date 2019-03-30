const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

var data = [
  {
  name: "Morning Mountain",
  image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
  description: "great place"  
  },
  {
  name: "Wicked Garten",
  image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
  description: "Awesome views!!"  
  }
];

var commentsData =
  {
   text: "I love this camping place!!",
  author: "Peter"
  }

function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, (err)=>{
    // if(err){
    //   console.log(err);
    // } else{
    //   console.log("removed Campgrounds!");
    //   //add a few campgrounds
    //   data.forEach((seed)=>{
    //     Campground.create(seed, (err, campground)=>{
    //       if(err){
    //         console.log(err);
    //       } else{
    //         console.log("Added Campground");
    //         // Create a comment
    //         Comment.create(commentsData, (err, comment)=>{
    //             if(err){
    //               console.log(err);
    //             } else {
    //               campground.comments.push(comment);
    //               campground.save();
    //               console.log("Created new comment");
    //             }
    //         });
    //       }
    //     });
    //   });
    //}
  });
  
  
}


module.exports = seedDB;