const express = require('express');
// routers have sperate params 
// so post callback to create new review does not have access to id params
// which is on the index.js
// to have access on that param here on reviews set mergeParmas to true
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');

const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

const Campground = require('../models/campground');
const Review = require('../models/review');

// post a review
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review')
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
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