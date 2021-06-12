var mongoose    =require("mongoose");

var complaintSchema=new mongoose.Schema({
    category : String,
    detail : String,
    hostel : String,
    room : String,
    date : Date,
    author:{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username: String
    }
});

module.exports=mongoose.model("Complaint",complaintSchema);