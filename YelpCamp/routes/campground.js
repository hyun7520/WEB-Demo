const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}))

// moving to create page using get method
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

// submit form to create new campground and redirect
// validateCampground validates input data on the server side
// create it into a middleware to use it in update as well
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    // saving different data type can cause problem
    // ex) saving String type to a Number
    // this will be catched at the error handling middle ware at the end
    // if (!req.body.campground) throw new expressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    // automatically add logged in user when created
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

// show details of campground when clicked
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        // nested populate, populate review and it's author
        .populate({
            path: 'reviews',
            poplulate: {
                path: 'author'
            }
        })
        // campground author
        .populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds');
    } else {
        res.render('campgrounds/show', { campground });
    }

}))

// move to edit form page
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    // check if author and current user is smae
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    // check if author and current user is smae
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully update Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    // check if author and current user is smae
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Campground');
    res.redirect('/campgrounds');
}))

module.exports = router;