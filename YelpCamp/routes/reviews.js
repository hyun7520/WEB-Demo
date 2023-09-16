const express = require('express');
// routers have sperate params 
// so post callback to create new review does not have access to id params
// which is on the index.js
// to have access on that param here on reviews set mergeParmas to true
const router = express.Router({ mergeParams: true });

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../scehmas.js');

const Campground = require('../models/campground');
const Review = require('../models/review');


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// post a review
router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review')
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    // delete reference to the review from the campground
    // pull: removes from an existing array all instances of a value or values that match condition
    // this case condtion is a review that matches params reviewId
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    // delete the review itself
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;