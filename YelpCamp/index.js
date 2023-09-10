const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const Campground = require('./models/campground');
const methodOverride = require('method-override');
// one of many tools for parse, run ejs
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const { campgroundJoiSchema } = require('./scehmas.js');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

main()
    .then(() => {
        console.log('Connected to Mongo');
    })
    .catch(err => {
        console.log('Error');
        console.log(err);
    });


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    // setup joi scehma
    const { error } = campgroundJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// use ejsMate for ejs engine
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

// moving to create page using get method
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

// submit form to create new campground and redirect
// validateCampground validates input data on the server side
// create it into a middleware to use it in update as well
app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
    // saving different data type can cause problem
    // ex) saving String type to a Number
    // this will be catched at the error handling middle ware at the end
    // if (!req.body.campground) throw new expressError('Invalid Campground Data', 400);

    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

// show details of campground when clicked
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
}))

// move to edit form page
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}))

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

// for every requrest, for every path
// order is important!
// this will only run if none of the path above was matched
app.all('*', (req, res, next) => {
    // next(new ExpressError('Page Not Found', 404))
    // this line is the 'err' for the callback below
    // or errors coming from somewhere above
    next(new ExpressError('Page Not Found', 404));
})

// catch all errors
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Somthing Went Wrong';
    }
    // render page when error 
    res.status(statusCode).render('error', { err });
    res.send('Unknow Error Occured')
})

app.listen(3000, () => {
    console.log('Connected to Port 3000');
})