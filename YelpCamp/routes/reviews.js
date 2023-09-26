const express = require('express');
// routers have sperate params 
// so post callback to create new review does not have access to id params
// which is on the index.js
// to have access on that param here on reviews set mergeParmas to true
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');

const reviews = require('../controllers/reviews');

const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

// post a review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;