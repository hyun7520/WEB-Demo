const express = require('express');
const app = express();
const morgan = require('morgan');

// no argument will excute this on every request
// app.use allows users to run code on every request
app.use(morgan('tiny'));
// now console will print out something like this
// GET /dogs 304 - - 0.446 ms


// app.use((req, res, next) => {
//     console.log('First Middleware');
//     return next();
//     // log here will run after all next middlewares has benn exected
//     //First Middleware
//     // Second Middleware
//     // After calling next

//     // adding return will stop log here from running
//     console.log('After calling next');
// })
// // First Middleware
// // GET /dogs 304 - - 2.273 ms
// // First Middleware
// // GET /cats 404 143 - 1.678 ms
// // First Middleware
// // GET /dolphins 404 147 - 0.797 ms
// // First Middleware
// // GET /cats 404 143 - 0.599 ms
// // using next() returns continuous response

// // if next() is not called response stops at cats
// // typing dolphins next won't do anything


// app.use((req, res, next) => {
//     console.log('Second Middleware');
//     return next();
// })
// //First Middleware
// // Second Middleware
// // After calling next

// app.use((req, res, next) => {
//     console.log('Third Middleware');
//     return next();
// })

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

// this is a middleware that runs when moving to /dogs
app.use('/dogs', (req, res, next) => {
    console.log('Dogs');
    next();
})

const verifyPassword = ((req, res, next) => {
    // just for example, never send password through query string
    const { password } = req.query;
    if (password === 'chicken') {
        next();
    }
    res.send('Need Password');
})

app.get('/', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`)
    res.send('Homepage');
})

app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`)
    res.send('Woof Woof');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('Secret');
})

// if nothing is sent back 
app.use((req, res) => {
    // change the status
    res.status(404).send('Not Found')
})

app.listen('3000', () => {
    console.log('Listening to 3000');
})