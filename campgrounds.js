const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");//for wrapper func
const ExpressError = require("../utils/ExpressError");//for ErrorsHandler in validateCampground
const Campground = require("../models/campground"); //for Campground model
const { campgroundSchema } = require("../schemas.js")//for campground server validation by Joi
const isLoggedIn = require("../middleware");//middleware to check if user is logged in

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

router.get("/", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}))

router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

router.post("/", validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash("success", "successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get("/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews");
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
}))

router.get("/:id/edit", isLoggedIn, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
}))

router.put("/:id", validateCampground, catchAsync(async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    req.flash("success", "successfully updated campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete("/:id", isLoggedIn, catchAsync(async (req, res) => {
    const deletedCampground = await Campground.findByIdAndDelete(req.params.id);
    req.flash("success", "successfully deleted campground!");
    res.redirect("/campgrounds");
}))

module.exports = router;