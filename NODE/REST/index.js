const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'that is funny'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erboi',
        comment: 'plz delete your account Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

// show all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

// move to create page
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// create new comment
app.post('/comments', (req, res) => {
    // console.log(req.body);
    // taking whole req.body and pushing it on an array is not a good idea
    // others can modify or push unnecessary data
    const { username, comment } = req.body;
    // so destructure first
    comments.push({ username, comment, id: uuid() });
    // res.send('It worked');
    res.redirect('/comments');
    // 2 requests happen
    // redirect 302 request to /comments
    // GET to /comments
})

// search by id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

// send original comment to edit
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

// update existing comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    // console.log(req.body);
    res.send(`orederd ${qty} ${meat} tacos`);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})