var express    = require("express");
var router     = express.Router({mergeParams:true});
var User       = require("../models/user");
var Class      = require("../models/class");
var Complaint  = require("../models/complaint");
var middleware = require("../middleware");

//INDEX Route
router.get("/",middleware.isProfessor,(req,res)=>{
    res.render("professor/index");
});

//============CLASS============

//Class INDEX
router.get("/class",middleware.isProfessor,function(err,res){
    Class.find({},function(err,allclass){
        if(err){
            console.log(err);
        }
        else{
            res.render("professor/class/index",{ classes : allclass });
        }
    });
});

//Class NEW
router.get("/class/new",middleware.isProfessor,(req,res)=>{
    res.render("professor/class/new");
});

//Class CREATE
router.post("/class/new",middleware.isProfessor,(req,res)=>{
    var nclasscode=req.body.classcode;
    var nname=req.body.name;
    var nauthor = {
        id : req.user._id,
        username : req.user.username
    };
    Class.create( { classcode:nclasscode, name:nname, author:nauthor },function(err,newClass){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            User.find({ batch : req.body.batch },function(err,allstudent){
                if(err){
                    console.log(err);
                    res.redirect("/professor/class");
                }
                else{
                    var course = { id : newClass._id , classcode : newClass.classcode , name : newClass.name  };
                    allstudent.forEach(function(student){
                        newClass.students.push(student);
                        student.courses.push(course);
                        student.save();
                    });
                    newClass.save();
                    res.redirect("/professor/class" );
                }
            })
        }   
    });
});

//============STUDENT============

//Student INDEX
router.get("/class/:id/student",middleware.isProfessor,function(req,res){
    Class.findById(req.params.id,function(err,foundclass){
        if(err){
            console.log(err);
        }
        else{
            if(req.user._id.equals(foundclass.author.id)){
                res.render("professor/class/student",{ classes : foundclass });
            }
            else{
                res.redirect("back");
            }
        }
    });
});

//============ATTENDENCE============

//Attendance INDEX
router.get("/class/:id/attendance",middleware.isProfessor,(req,res)=>{
    Class.findById(req.params.id,function(err,foundclass){
        if(err){
            console.log(err);
        }
        else{
            if(req.user._id.equals(foundclass.author.id)){
                res.render("professor/class/attendance",{ classes : foundclass });
            }
            else{
                res.redirect("back");
            }
        }
    });
});

//Attendance NEW
router.get("/class/:id/attendance/new",middleware.isProfessor,(req,res)=>{
    Class.findById(req.params.id,function(err,foundclass){
        if(err){
            console.log(err);
        }
        else{
            if(req.user._id.equals(foundclass.author.id)){
                res.render("professor/class/newattendance",{ classes : foundclass });
            }
            else{
                res.redirect("back");
            }
        }
    });
});

//Attendance CREATE
router.post("/class/:id/attendance/new",middleware.isProfessor,(req,res)=>{
    Class.findById(req.params.id,function(err,classes){
        if(err){
            console.log(err);
        }
        else{
            if(req.user._id.equals(classes.author.id)){
                var dt={ date : req.body.date };
                classes.students.forEach((found,i)=>{
                    var at={present : req.body.present[i] };
                    found.attendance.push(at);
                });
                classes.attendancedate.push(dt);
                classes.save();
                res.redirect("/professor/class/"+classes._id+"/attendance");
            }
            else{
                res.redirect("back");
            }
        }
    });
});

//=============GRADES============

//Grades INDEX
router.get("/class/:id/grade",middleware.classOwnership,(req,res)=>{
    Class.findById(req.params.id,function(err,foundclass){
        if(err){
            console.log(err);
        }
        else{
            res.render("professor/class/grade",{ classes : foundclass });
        }
    });
});

//Grades NEW
router.get("/class/:id/grade/new",middleware.classOwnership,(req,res)=>{
    Class.findById(req.params.id,function(err,foundclass){
        if(err){
            console.log(err);
        }
        else{
            res.render("professor/class/newgrade",{ classes : foundclass });
        }
    });
});

//Grades CREATE
router.post("/class/:id/grade/new",middleware.classOwnership,(req,res)=>{
    Class.findById(req.params.id,function(err,classes){
        if(err){
            console.log(err);
        }
        else{
            var dt={ title : req.body.title ,total : req.body.total };
            classes.students.forEach((found,i)=>{
                var at={marks : req.body.marks[i] };
                console.log(at);
                found.grade.push(at);
            });
            classes.gradetitle.push(dt);
            classes.save();
            res.redirect("/professor/class/"+classes._id +"/grade");
        }
    });
});

//=============DELETE============

//DELETE Class
router.delete("/class/:id",function(req,res){
    User.find({isrole:"student"},(err,user)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            // console.log(req.params.id);
            user.forEach((student)=>{
                var len=student.courses.length;
                for(var i=0;i<len;i++){
                    if(student.courses[i].id.equals(req.params.id)){
                        // console.log(student.courses[i].id);
                        student.courses.splice(i,1);
                        student.save();
                        i=len;
                    }
                }
            })
            Class.findByIdAndRemove(req.params.id,function(err){
                if(err){
                    console.log(err);
                    res.redirect("back");
                }else{
                    
                    req.flash("success","Class successfully deleted!");
                    res.redirect("/professor/class");
                }
            });
        }
    })
});

module.exports = router;
