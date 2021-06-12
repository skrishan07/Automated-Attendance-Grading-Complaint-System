var mongoose              = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema =new mongoose.Schema({
    email : String,
    fullname : String,
    password : String,
    roll : String,
    batch : String,
    isrole : String,
    courses:[{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Class"
        },
        classcode:String,
        name:String
    }]
});

UserSchema.plugin(passportLocalMongoose,{ usernameField : 'email'});

module.exports = mongoose.model("User",UserSchema);