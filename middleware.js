const Campground = require('./models/campground')
const Review = require('./models/reviews')
const ExpressError = require('./utils/ExpressError.');
const { campgroundSchema, reviewSchema } = require('./schema.js') //this is the joi schema


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error)   //if there is an error in joy we want to pass that error to our express error handler 
    {  //we will loop over the array details to get just the message
        msg = error.details.map(el => el.message)
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}


module.exports.validateCampground = (req, res, next) => {
    // const result = campgroundSchema.validate(req.body); (this will give us the whole result but we just want the error part so we are going to destucture like so:)
    //result is an object conatining another object called error
    const { error } = campgroundSchema.validate(req.body);
    if (error)   //if there is an error in joy we want to pass that error to our express error handler 
    {  //we will loop over the array details to get just the message
        msg = error.details.map(el => el.message)
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }

}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in to do that')
        return res.redirect('/login')
    }
    next();
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp.author.equals(req.user._id)) {
        req.flash('error', 'you do not have permission to do that');
        res.redirect(`/campgrounds/${id}`);
        return;
    }
    next();

}
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'you do not have permission to do that');
        res.redirect(`/campgrounds/${id}`);
        return;
    }
    next();

}
