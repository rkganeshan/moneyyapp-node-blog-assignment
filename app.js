const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");
const fs=require("fs");

//configurations
const app=express();
dotenv.config();

//app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//bringing routes
const blogRoutes=require("./routes/blog")
const reviewRoutes=require("./routes/review");

//route middlewares
app.use("/blog",blogRoutes);
app.use("/review",reviewRoutes);


//api documentation
app.get("/",(req,res)=>{
    fs.readFile("./apiDocs.json",(err,data)=>{
        if(err)
        {
            res.status(400).json({error:err})
        }
        const docs=JSON.parse(data);
        res.status(200).json(docs)
    })
})

//connecting to mongo cloud db
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB Connected!");
})
.catch((err)=>{console.log(err)});


//make the app listen
app.listen(process.env.PORT || 8082,{
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useCreateIndex: true
},()=>{
console.log(`App is listening at Port:${process.env.PORT}`);
})
