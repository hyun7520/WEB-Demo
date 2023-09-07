const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

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
    // res.status(401);
    // res.send('Need Password');
    throw new AppError('password required', 401);
})

app.get('/', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`)
    res.send('Homepage');
})

// create an error to see express's built in error handler, chicken method does not exist
// this will return html body and status code of server side error 505
app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`)
    res.send('Woof Woof');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('Secret');
})

// test for error thrower
app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin', 403);
})

// if nothing is sent back 
app.use((req, res) => {
    // change the status
    res.status(404).send('Not Found')
})

// building custom error handler
// all 4 arguments should be passed to be treated as an error handler
// app.use((err, res, req, next) => {
//     console.log('*******************************************')
//     console.log('*******************Error*******************')
//     console.log('*******************************************')
//     // res.status(500).send('Error!')
//     // passing argument will trigger calling next error handler
//     // passing nothing will call non error handling middleware
//     // next middleware is not defined so it hands err to default error handler
//     next(err)
// })

app.use((err, req, res, next) => {
    // give status default value 500 if err does not have one
    // '/error' does not have an error thrower so it does not have a status in err body
    // verifyPassword has one so it throws error with it's own status code 
    // but 'password required' is replaced by 'errr'
    // const { status = 500 } = err;
    // so add destructuring for message as well to show function's own error message
    // const { message = 'Something went wrong' } = err;
    // can do this in one line
    // 'Something went wrong' won't be printed out as long as there is message in err body
    // and Javascript will send it's own message like 'chicken is not defined'
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen('3000', () => {
    console.log('Listening to 3000');
})