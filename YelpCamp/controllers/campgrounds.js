const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
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
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        // nested populate, find the campground 
        // populate reviews
        .populate({
            path: 'reviews',
            // then populate it's author
            populate: {
                path: 'author'
            }
            // and popultae campground's author
        }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds');
    } else {
        res.render('campgrounds/show', { campground });
    }

}

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    // check if author and current user is smae
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    // check if author and current user is smae
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully update Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    // check if author and current user is smae
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Campground');
    res.redirect('/campgrounds');
}