const Blog=require("../models/blog");
const Review=require("../models/review");
const moment=require("moment");


exports.getAllReviewsByBlogId=async(req,res)=>{
    try
    {
        const blog=await Blog.findById(req.params.blogId)
        if(blog)
        {
            await Review.find({blogId:req.params.blogId})
            .populate("blogId","_id title body")
            .then((resp)=>{
                res.status(200).json({
                    reviews:resp
                })
            })
            .catch((err)=>{
                res.status(500).json({message:err});
            })
        }
        else
        {
            throw("The provided Blog id doesnt exist,so reviews cannot be fetched for it.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.createReview=async(req,res)=>{
    try{
        let blog=await Blog.findById(req.params.blogId);
        if(blog)
        {
            if(req.body.description)
            {
                let newReview=await Review.create(req.body);
                newReview.blogId=blog;
                await newReview.save();
                res.status(200).send({message:"Review Created",newReview});
            }
            else
            {
                throw("'description' field is not present in request body.")
            }
        }
        else
        {
            throw("Provided Blog id not found,so review cannot be created for that blog.")
        }
        
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.deleteReview=async(req,res)=>{
    try{
        const review=await Review.findById(req.params.reviewId);
        if(review)
        {
            await review.deleteOne({_id:req.params.reviewId});
            res.status(204).send({message:"Review Deleted Deleted"});
        }
        else
        {
            throw("Provided review id doesnt exist,so cant be deleted.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}