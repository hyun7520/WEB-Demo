const express = require('express');
const router = express.Router();

const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

// require multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// organized using one route
// take out path argument as they have same routes
router.route('/')
    .get(catchAsync(campgrounds.index))
    // submit form to create new campground and redirect
    // validateCampground validates input data on the server side
    // create it into a middleware to use it in update as well
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

    // fieldname for image input is set to image
    .post(upload.single('image'), (req, res) => {
        console.log(req.body, req.file);
        res.send('it worked');
    })

// moving to create page using get method
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    // show details of campground when clicked
    .get(catchAsync(campgrounds.showCampground))
    // edit campgrounds
    .put(isLoggedIn,
        isAuthor,
        validateCampground,
        catchAsync(campgrounds.updateCampground))
    // delete campgrounds
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// move to edit form page
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;