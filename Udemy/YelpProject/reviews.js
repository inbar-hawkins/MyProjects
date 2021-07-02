const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");//for wrapper func
const ExpressError = require("../utils/ExpressError");//for ErrorsHandler in validateReview
const Campground = require("../models/campground"); //for Campground model
const Review = require("../models/review"); //for Review model
const { reviewSchema } = require("../schemas.js")//for review server validation by Joi
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");//middleware for new,edit, delete  

router.post("/", validateReview, isLoggedIn, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "successfully made a new review!");
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "successfully deleted review!");
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;