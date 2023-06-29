const express = require('express');
const app = express();
const path = require('path');

// for every single request 
// req.body will be now shown
app.use(express.urlencoded({ extended: true }));
// to parse json type body
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
    {
        username: 'Todd',
        comment: 'that is funny'
    },
    {
        username: 'Skyler',
        comment: 'I like to go Swimming'
    },
    {
        username: 'Sk8erboi',
        comment: 'Plz delete'
    },
    {
        username: 'onlysaywoof',
        comment: 'WOof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

// why two routes? -> data needs to be sent somewhere as post request
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    // could just extract the data from body or push the body on to an array
    // but this may contain unnecessary stuff or someone can use 'postman' to add fields
    // so destructure it
    const { username, comment } = req.body;
    comments.push({ username, comment })
    res.send("IT WORKED")
    // submit comment and check back at /comments
    // new line will be added
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    // console.log(req.body)
    // req.body is by default 'undefined'
    // need to tell express how to parse the encoded body
    const { meat, qty } = req.body;
    res.send(`The quantity is ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})

// REST -> principals for how client and servers should communicate