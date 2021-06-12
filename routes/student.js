var express    = require("express");
var router     = express.Router({mergeParams:true});
var User       = require("../models/user");
var Class      = require("../models/class");
var Complaint  = require("../models/complaint");
var middleware = require("../middleware");

// INDEX Route
router.get("/",middleware.isStudent,(req,res)=>{
    res.render("student/index",{student : req.user});
});

// SHOW Classes
router.get("/classes",middleware.isStudent,(req,res)=>{
    res.render("student/class/show",{student : req.user});
});

// SHOW Complaint
router.get("/complaint",middleware.isStudent,(req,res)=>{
    Complaint.find({},function(err,complaint){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            var filterComplaint = complaint.filter((complaint)=>{
                return (complaint.author.id.equals(req.user._id)); 
            });
            res.render("student/complaint/index",{student : req.user , complaint : filterComplaint});
        }
    });
});

// NEW Complaint Route
router.get("/complaint/new",middleware.isStudent,(req,res)=>{
    res.render("student/complaint/new",{student : req.user});
});

// POST Complaint Route
router.post("/complaint/new",middleware.isStudent,(req,res)=>{
    var ncategory=req.body.category;
    var ndetail=req.body.detail;
    var nhostel=req.body.hostel;
    var nroom=req.body.room;
    var ndate=Date.now();
    var nauthor = {
        id : req.user._id,
        username : req.user.username
    };
    Complaint.create( { category:ncategory, detail:ndetail, hostel:nhostel, room:nroom, date:ndate, author:nauthor },function(err,comp){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            req.flash("success","Complaint successfully added !" );
            res.redirect("/student/complaint");
        }   
    });
});

// DESTROY Complaint Route
router.delete("/complaint/:cid",middleware.isStudent,function(req,res){
    Complaint.findByIdAndRemove(req.params.cid,function(err,complaint){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            if(complaint.author.id.equals(req.user._id)){
                req.flash("success","Complaint successfully withdrawn !" );
                res.redirect("/student/complaint");
            }
            else{
                res.redirect("back");
            }
            
        }
    });
});

// SHOW Single Complaint Route
router.get("/complaint/:cid",middleware.isStudent,(req,res)=>{
    Complaint.findById(req.params.cid,function(err,complaint){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            if(complaint.author.id.equals(req.user._id)){
                res.render("student/complaint/show",{student : req.user , complaint : complaint});
            }
            else{
                res.redirect("back");
            }
        }
    });
});

// SHOW Attendance Route
router.get("/classes/:classid/attendance",middleware.isStudent,(req,res)=>{
    Class.findById(req.params.classid,function(err,classes){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            var flag=false;
            req.user.courses.forEach((course)=>{
                if(course.id.equals(classes._id)){
                    flag=true;
                }
            });
            if(flag===true){
                res.render("student/class/attendance",{givenstudent : req.user,classes : classes});
            }
            else{
                res.render("back");
            }
        }
    });
});

// SHOW Grade Route
router.get("/classes/:classid/grade",middleware.isStudent,(req,res)=>{
    Class.findById(req.params.classid,function(err,classes){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            var flag=false;
            req.user.courses.forEach((course)=>{
                if(course.id.equals(classes._id)){
                    flag=true;
                }
            });
            if(flag===true){
                res.render("student/class/grade",{givenstudent : req.user,classes : classes});
            }
            else{
                res.redirect("back");
            }
        }
    });
});

module.exports = router;