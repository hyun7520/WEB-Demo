const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.registerUser));

router.get('/login', users.renderLogin);

// authenticate with local strategy
router.post('/login', storeReturnTo, passport.authenticate('local',
    // authenticate options
    { failureFlash: true, failureRedirect: '/login' }),
    users.login
);

router.get('/logout', users.logout);

module.exports = router;