const express = require('express');
const router = express.Router();

const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.get('/', catchAsync(campgrounds.index));

// moving to create page using get method
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// submit form to create new campground and redirect
// validateCampground validates input data on the server side
// create it into a middleware to use it in update as well
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// show details of campground when clicked
router.get('/:id', catchAsync(campgrounds.showCampground));

// move to edit form page
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// edit campgrounds
router.put('/:id', isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground));

// delete campgrounds
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;