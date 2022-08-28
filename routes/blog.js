const express=require("express");
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require("../controllers/blog");
const router=express.Router();


router.get("/",getAllBlogs);
router.get("/:blogId",getBlogById);
router.post("/new",createBlog);
router.put("/:blogId",updateBlog);
router.delete("/:blogId",deleteBlog);

module.exports=router;