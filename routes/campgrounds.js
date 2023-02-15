const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schema.js')
const { isLoggedIn } = require('../middleware');
const { isAuthor } = require('../middleware');
const { validateCampground } = require('../middleware');
const Campground = require('../models/campground')
const Review = require('../models/campground');
const multer = require('multer');
const { storage } = require("../cloudinary")
const upload = multer({ storage })
const campgrounds = require("../controllers/campgrounds")


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.newPost))

router.get('/new', isLoggedIn, campgrounds.new)

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.edit))

router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.update))
    .delete(catchAsync(campgrounds.delete))








module.exports = router;
