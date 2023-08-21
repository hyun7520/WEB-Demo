const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
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
        comment: 'I like to go birdwatching with my dog'
    },
    {
        username: 'Sk8erboi',
        comment: 'plz delete your account Todd'
    },
    {
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    // console.log(req.body);
    // taking whole req.body and pushing it on an array is not a good idea
    // others can modify or push unnecessary data
    const { username, comment } = req.body;
    // so destructure first
    comments.push({ username, comment });
    res.send('It worked');
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