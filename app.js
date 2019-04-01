const express         = require("express");
const app             = express();
const expressSession  = require("express-session");
const bodyParser      = require("body-parser");
const mongoose        = require("mongoose");
const Campground      = require("./models/campground");
const flash           = require("connect-flash"); //always before passport
const seedDB          = require("./seeds");
const Comment         = require("./models/comment");
const passport        = require("passport");
const LocalStrategy   = require("passport-local");
const methodOverride  = require("method-override");
const User            = require("./models/user");

//=============================
// Requiring the Routes files
//=============================
const commentRoutes     = require("./routes/comments");
const campgroundRoutes  = require("./routes/campgrounds");
const indexRoutes        = require("./routes/index");


// code to use body parser
app.use(bodyParser.urlencoded({extended: true}));

// code to connect to the mongo database locally
//mongoose.connect("mongodb://localhost:27017/yelp_camp_v12", { useNewUrlParser: true });

//code to connect the mongo database to Mongo DB Atlas
mongoose.connect("mongodb+srv://Rodrigo:rodrigo@yelpcampcluster-tautd.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });

// code to use ejs and to avoid writing ".ejs" 
app.set("view engine", "ejs");

//seedDB(); //use this to create 3 campground examples...

// code to use the files in the "public" folder 
app.use(express.static(__dirname + "/public"));

// code to use the method override
app.use(methodOverride("_method"));

// code to use flash
app.use(flash());

//=========================
//PASSPORT CONFIGURATION
//=========================
app.use(expressSession({
  secret: "Lola is the most pretty dog in the world",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=========================================================================
//this is a middleware to use the logged in user inside the templates (ejs)
//=========================================================================
app.use((req, res, next)=>{
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//=========================================================
// code to use the routes files (3 different ways to do it)
//=========================================================
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//===============
// SERVER 
//===============
app.listen(process.env.PORT, process.env.IP, ()=>{
  console.log("Yelp Camp Server Started !!!");
});