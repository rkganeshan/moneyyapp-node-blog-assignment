const express=require("express");
const {createReview,deleteReview,getAllReviewsByBlogId } = require("../controllers/review");
const router=express.Router();


router.get("/:blogId",getAllReviewsByBlogId);
router.post("/new/:blogId",createReview);
router.delete("/:reviewId",deleteReview);

module.exports=router;