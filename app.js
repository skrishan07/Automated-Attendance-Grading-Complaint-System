var express       = require("express");
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride= require("method-override");
var User          = require("./models/user");
var Class         = require("./models/class");
var Complaint     = require("./models/complaint");
var middleware    = require("./middleware");
var flash         = require("connect-flash");
var app           = express();
var seedDB        = require("./seeds");

var adminRouter     = require("./routes/admin");
var professorRouter = require("./routes/professor");
var studentRouter = require("./routes/student");


//==============Configure==============//

app.use(express.static("public"));
app.set("view engine","ejs");
app.use( bodyParser.urlencoded( { extended:true } ) );
app.use(methodOverride("_method"));
app.use(flash());

//Mongoose
mongoose.connect("mongodb://localhost/automatedSystem", { useNewUrlParser: true , useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

//Passport
app.use(require("express-session")({
    secret : "Hala Madrid",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, User.authenticate()));
// passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    res.locals.currentuser=req.user;
    next();
});

seedDB();

//==============Routes==============//

//INDEX Route
app.get("/",(req,res) =>{
    if(req.user===undefined){
        res.render("landing");   
    }
    else{
        console.log(req.user);
        res.redirect("/"+req.user.isrole);   
    }
});

// SHOW Login Form
app.get("/login",(req,res)=>{
    res.render("login");
});

// POST Login Form
app.post("/login",passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),function(req,res){
    res.redirect("/"+req.user.isrole);
});

//Logout
app.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Succesfully Logout");
    res.redirect("/");
});

app.use("/admin",adminRouter);
app.use("/professor",professorRouter);
app.use("/student",studentRouter);

//=========Listen=========//
app.listen(3000,function(){
    console.log("Automated System Server Started !!!");
});