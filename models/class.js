var mongoose    =require("mongoose");

var classSchema=new mongoose.Schema({
    classcode:String,
    name:String,
    author:{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        fullname: String
    },
    students:[{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        fullname : String,
        roll: String,
        email : String,
        attendance:[{
            present: String
        }],
        grade:[{
            marks: String
        }]
    }],
    attendancedate:[{
        date: Date
    }],
    gradetitle:[{
        title: String,
        total: String
    }]
});

module.exports=mongoose.model("Class",classSchema);