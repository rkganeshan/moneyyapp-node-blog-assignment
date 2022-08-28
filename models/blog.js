const mongoose=require("mongoose");
const {uuid} =require("uuidv4");
const moment=require("moment");

const blogSchema=mongoose.Schema({
    _id: { 
        type: String, 
        default: () => uuid() 
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        require:true,
        trim:true
    },
    cDate:{
        type:String,
        default:moment().format("YYYY/MM/DD/HH/mm/ss")
    },
    uDate:String
})

module.exports=mongoose.model("Blog",blogSchema);