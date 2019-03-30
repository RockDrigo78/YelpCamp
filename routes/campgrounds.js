const express = require("express");
const router  = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware/index.js");


//=================
//ROUTES
//================
//  CAMPGROUND INDEX ROUTE- show all campgrounds
router.get("/", (req, res)=>{
  // get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

// "CREATE" ROUTE - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res)=>{
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: image, price: price, description: desc, author: author};
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated)=>{
    if(err){
      console.log(err);
    }
    else {
      req.flash("success", "Campground created");
      res.redirect("/campgrounds");
    }
  });
});

//NEW ROUTE - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res)=>{
  res.render("campgrounds/new");
});

// SHOW ROUTE - shows more info about one campground
router.get("/:id", (req, res)=>{
  //find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
    if(err){
      console.log(err);
    }
    else {
      // render show 
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//======================================
// EDIT CAMPGROUND ROUTE  only the view
//======================================
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
      if(err){
        res.redirect("back");
      } else {
      res.render("campgrounds/edit", {campground: foundCampground});
      }
  });
});

// UPDATE CAMPGROUND ROUTE
// find and update the correct campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//=================================
//DESTROY (DELETE) CAMPGROUND ROUTE
//=================================
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
  Campground.findByIdAndRemove(req.params.id, (err)=>{
    if(err){
      res.redirect("/campgrounds");
    } else{
      res.redirect("/campgrounds");
    }
  });
});


// Exporting the Router
module.exports = router;