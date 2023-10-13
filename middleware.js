const { campgroundJoiSchema, reviewSchema } = require('./scehmas');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // console.log(req.path, req.originalUrl);
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect('/login')
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    // setup joi scehma
    const { error } = campgroundJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    // check if author and current user is smae
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// check if current user is the author of a review
module.exports.isReviewAuthor = async (req, res, next) => {
    // campground page id, review id
    const { id, reviewId } = req.params;
    // check if author and current user is smae
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}