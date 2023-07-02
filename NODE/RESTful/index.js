const express = require('express');
const app = express();
const path = require('path');
// id: 1 type is not ideal
// use uuid to set unique universal id for each comments
const { v4: uuid } = require('uuid');
// const { origianl name: new name }
const methodOverride = require('method-override')


// for every single request 
// req.body will be now shown
app.use(express.urlencoded({ extended: true }));
// to parse json type body
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'that is funny'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go Swimming'
    },
    {
        id: uuid(),
        username: 'Sk8erboi',
        comment: 'Plz delete'
    },
    {
        id: uuid(),
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
    comments.push({ username, comment, id: uuid() })
    // res.send("IT WORKED")
    // submit comment and check back at /comments
    // new line will be added
    // HOWEVER!

    // pressing f5(refresh) at 'IT WORKED' page after entering comment
    // will duplicate the inputed data
    // hitting refresh will send the same request, with same body
    // redirecting to the page can solve this
    // default status is '302 found'
    // Instead of sending back use redirect
    res.redirect('/comments');
    // on network 2 response happen
    // first response: 302 status code -> redirect to the comments
    // redirect makes new req to /comments
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})


// patch to update parts, put to replace all
// this way of updating is not recommended
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
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
