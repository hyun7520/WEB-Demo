// combine logic with html responses
// tools - EJS, handlebars, Jade, Nunjunks

const express = require('express');
const app = express();
const path = require('path');
// path module come built in, file and dirctory path
const redditData = require('./data.json');

// static assets, using middleware
// set directory
// if excuted in other directory -> error
// because it will look for 'public' directory at the excuted directry 
// fix by setting absolute path
app.use(express.static(path.join(__dirname, '/public')))
// __dirname set absolute path to the current file -> index.js

app.set('view engine', 'ejs');
// npm i ejs
// mkdir views -> touch home.ejs
app.set('views', path.join(__dirname, '/views'))
// able to excute the file in differnet directory
// use the dirctory name where index.js is located
// for that directory add /views to the end
// now as longs as directory is correctly written idex.js and ejs will excute
// ex) one dirctory up cd ..
// nodemon Templating/index.js

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Orange', 'Monty'
    ]
    res.render('cats', { cats });
})

app.get('/', (req, res) => {
    res.render('home')
    // can send files using render
    // if view engine is set to ejs .ejs after file is not necessary
    // res.render default location is /views so /views before file name is also not necessary
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data })
    }
    else {
        res.render('NotFound', { subreddit })
    }
    // ... -> spreads out the "own" enumerable properties
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    // send an object to the template
    // good code much of logic ot of html
    res.render('random', { num: num })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})