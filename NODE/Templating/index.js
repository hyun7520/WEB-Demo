// combine logic with html responses
// tools - EJS, handlebars, Jade, Nunjunks

const express = require('express');
const app = express();
const path = require('path');
// path module come built in, file and dirctory path

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

app.get('/', (req, res) => {
    res.render('home')
    // can send files using render
    // if view engine is set to ejs .ejs after file is not necessary
    // res.render default location is /views so /views before file name is also not necessary
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})