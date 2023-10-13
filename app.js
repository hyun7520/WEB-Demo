if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// one of many tools for parse, run ejs
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');

const ExpressError = require('./utils/ExpressError');

// require routes
const userRoutes = require('./routes/users');
const campgrounds = require('./routes/campground');
const reviews = require('./routes/reviews');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const mongoSanitize = require('express-mongo-sanitize');

const helmet = require('helmet');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/YelpCamp';

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

// const dbUrl = 'mongodb://127.0.0.1:27017/YelpCamp'

// mongodb://127.0.0.1:27017/YelpCamp - local url
async function main() {
    await mongoose.connect(dbUrl);
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

const store = MongoStore.create({
    mongoUrl: dbUrl,
    // lazy update - prevent unneccessary unchanged cookie saves
    // 24hours 60min 60sec
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function (e) {
    console.log("Session Store Error", e);
})

// enable session
const sessionconfig = {
    // store: store
    store,
    // default id of session
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // basic security, set to true for default
        httpOnly: true,
        // secure -> set cookie to work only over https
        // secure: true,
        // today date(in miliseconds) + 7day
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionconfig));
app.use(flash());

app.use(passport.initialize());
// needs to be placed after app.use(session());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(mongoSanitize({
    // replace symbol
    replaceWith: '_'
}));

// automatically enbale middlewares that comes with helmet
app.use(helmet());

// configured content-security-policy for YelpCamp
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    // bootstrap suggest single link tag for css and js
    // so add the link here as well, where bootstrap css and js is coming from.
    "https://cdn.jsdelivr.net"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                // start server, load local host, right click to inspect page
                // search for img, copy and paste my account
                `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`, //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


// use ejsMate for ejs engine
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// every request have access to this
app.use((req, res, next) => {
    // console.log(req.session);
    // all templates have access to current user

    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// create user
app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'dave@gmail.com', username: 'daveee' });
    // hashes the password with salt ans store it 
    const newUser = await User.register(user, 'davepwd');
    res.send(newUser);
})

app.use('/', userRoutes);
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);


app.get('/', (req, res) => {
    res.render('campgrounds/home')
});

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