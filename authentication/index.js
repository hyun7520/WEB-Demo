const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const user = require('./models/user');

const sessionOptions = { secret: 'notagoodsecret', saveUninitialized: false, resave: false };

main()
    .then(() => console.log('Connected to Mongoose'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/authDemo');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middle ware to check if logged in
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));

app.get('/', (req, res) => {
    res.send('this is the homepage');
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // const hash = await bcrypt.hash(password, 12);
    // let the model file do the hashing before data is saved
    const user = new User({ username, password })
    await user.save();
    // registering will automatically login
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        // if logged in, store user._id in session
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        res.render('secret')
    }
})

app.listen(3000, (req, res) => {
    console.log('Listening on Port 3000');
})