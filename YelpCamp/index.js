const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// one of many tools for parse, run ejs
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');

const ExpressError = require('./utils/ExpressError');

const campgrounds = require('./routes/campground');
const reviews = require('./routes/reviews');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp');
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
app.use(express.static(path.join(__dirname, 'public')));

// enable session
const sessionconfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // basic security, set to true for default
        httpOnly: true,
        // today date(in miliseconds) + 7day
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionconfig));
app.use(flash());

// use ejsMate for ejs engine
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// every request have access to this flash
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home')
})

// order is important!
// for every requrest, for every path
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
})

app.listen(3000, () => {
    console.log('Connected to Port 3000');
})