const Blog=require("../models/blog");
const moment=require("moment");

exports.getAllBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find({});
        if(blogs)
        {
            res.status(200).send({blogs});
        }
        else
        {
            throw("No blogs available to show.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.getBlogById=async(req,res)=>{
    try{
        const blog=await Blog.findById(req.params.blogId);
        if(blog)
        {
            res.status(200).send({blog});
        }
        else
        {
            throw("The provided blog id doesnt exist.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.createBlog=async(req,res)=>{
    try{
        if(req.body.title && req.body.body)
        {
            let newBlog=await Blog.create(req.body);
            res.status(201).send({message:"New Blog Created",newBlog});
        }
        else
        {
            throw("'title' and/or 'body' field(s) not present in the request object.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.updateBlog=async(req,res)=>{
    try{
        const blog=await Blog.findById(req.params.blogId);
        if(blog)
        {
            for(let key in req.body)
            {
                blog[key]=req.body[key];
            }
            blog.uDate=moment().format("YYYY/MM/DD/HH/mm/ss");
            await blog.save();
            res.status(200).send({message:"Blog Updated",updatedBlog:blog});
        }
        else
        {
            throw(`Blog with id:${req.params.blogId} doesnt exist.`)
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.deleteBlog=async(req,res)=>{
    try{
        const blog=await Blog.findById(req.params.blogId);
        if(blog)
        {
            await blog.deleteOne({_id:req.params.blogId});
            res.status(204).send({message:"Blog Deleted"});
        }
        else
        {
            throw("The provided Blog id doesnt exist,so nothing to delete.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}