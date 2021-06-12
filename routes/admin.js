var express    = require("express");
var router     = express.Router();
var User       = require("../models/user");
var Class      = require("../models/class");
var Complaint  = require("../models/complaint");
var middleware = require("../middleware");

//INDEX Route
router.get("/",middleware.isAdmin,(req,res)=>{
    res.render("admin/index");
});

//NEW Professor Form
router.get("/professor/new",middleware.isAdmin,(req,res)=>{
    res.render("admin/newProfessor");
});

//POST NEW Professor Form
router.post("/professor/new",middleware.isAdmin,(req,res)=>{
    User.register(new User({email : req.body.email, fullname : req.body.fullname, isrole : req.body.isrole }),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/admin/newProfessor");
        }
        else{
            res.redirect("/admin");
        }
    })
})

//NEW Student Form
router.get("/student/new",middleware.isAdmin,(req,res)=>{
    res.render("admin/newStudent");
});

//POST NEW Student Form
router.post("/student/new",middleware.isAdmin,(req,res)=>{
    User.register(new User({fullname:req.body.fullname, email:req.body.email, batch:req.body.batch , isrole:req.body.isrole , roll:req.body.roll}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/admin/newStudent");
        }
        else{
            res.redirect("/admin");
        }
    })
})

//SHOW Complaint
router.get("/complaint",middleware.isAdmin,(req,res)=>{
    Complaint.find({},function(err,complaint){
        if(err){
            console.log(err);
        }
        else{
            res.render("admin/complaint/index", {complaint : complaint});
        }
    });
});

//SHOW Single Complaint
router.get("/complaint/:cid",middleware.isAdmin,(req,res)=>{
    Complaint.findById(req.params.cid,function(err,complaint){
        if(err){
            console.log(err);
        }
        else{
            User.findById(complaint.author.id,function(err,student){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("admin/complaint/show",{complaint : complaint, student: student});
                }
            });
        }
    });
});

//DESTROY Complaint
router.delete("/complaint/:cid",middleware.isAdmin,function(req,res){
    Complaint.findByIdAndRemove(req.params.cid,function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Complaint successfully Deleted !" );
            res.redirect("/admin/complaint");
        }
    });
});

module.exports = router;