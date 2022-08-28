const mongoose=require("mongoose");
const {uuid} =require("uuidv4");
const moment=require("moment");
const {ObjectId}=mongoose.Schema;

const reviewSchema=mongoose.Schema({
    _id: { 
        type: String, 
        default: () => uuid() 
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    blogId:{
        type:String,
        ref:"Blog"
    },
    cDate:{
        type:String,
        default:moment().format("YYYY/MM/DD/HH/mm/ss")
    },
    uDate:String
})

module.exports=mongoose.model("Review",reviewSchema);