var User           = require("../models/user");
var Class          = require("../models/class");
var Complaint      = require("../models/complaint");
var middlewareObj = {};

middlewareObj.isAdmin = function (req,res,next){
    if( req.isAuthenticated() ){
        if(req.user.isrole==="admin"){
            next();
        }
        else{
            req.logout();
            res.redirect("back");
        }
    }else{
        res.redirect("back");
    }
};

middlewareObj.isProfessor = function (req,res,next){
    if( req.isAuthenticated() ){
        if(req.user.isrole==="professor"){
            next();
        }
        else{
            req.logout();
            res.redirect("back");
        }
    }else{
        res.redirect("back");
    }
};

middlewareObj.classOwnership = function (req,res,next){
    if(req.isAuthenticated() && req.user.isrole==="professor"){
        Class.findById(req.params.id,function(err,foundclass){
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else{
                if(req.user._id.equals(foundclass.author.id)){
                    next();
                }
                else{
                    console.log(err);
                    res.redirect("back");
                }   
            }
        });
    }
    else{
        console.log(err);
        res.redirect("back");
    }
};

middlewareObj.isStudent = function (req,res,next){
    if( req.isAuthenticated() ){
        if(req.user.isrole==="student"){
            next();
        }
        else{
            req.logout();
            res.redirect("back");
        }
    }else{
        res.redirect("back");
    }
};

module.exports = middlewareObj;