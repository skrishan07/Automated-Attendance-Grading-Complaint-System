var mongoose    =require("mongoose");
var User       = require("./models/user");

function seedDB(){
    User.find({isrole:"admin"},function(err,user){
        if(err){
            console.log(err);
        }
        else{
            if(user.length===0){
                User.register(new User({fullname : "Admin", email : "admin@iiitm.ac.in", isrole : "admin" }),"admin",function(err,user){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Created new admin.");
                    }
                })
            }
        }
        
    });
    
}

module.exports=seedDB;