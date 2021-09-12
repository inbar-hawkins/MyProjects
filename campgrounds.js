const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");//for wrapper func
const Campground = require("../models/campground"); //for Campground model
const { validateCampground, isLoggedIn, isAuthor } = require("../middleware");//middleware for new,edit, delete 
const campgrounds = require("../controllers/campgrounds") //for campgrounds functions such as index
const multer = require('multer') //parsing multipart/form-data
const upload = multer({ dest: 'uploads/' }) //destination for the images

//all routes using controllers/campgrounds

router.route("/")
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    .post(upload.array("campground[image]"), (req, res) => {
        console.log(req.body, req.files);
    })

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.destroyCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router;