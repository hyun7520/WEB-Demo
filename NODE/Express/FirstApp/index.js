const express = require("express");
const app = express()
console.dir(app)

// method runs for any request income
// enter on chrome => prints at git bash
/*
app.use((req, res) => { // request, response
    // http request is text -> express parse it into object
    // Express creates JS object automatically by parsing the request
    console.log("Incoming request")
    res.send('<h1>This is my Webpage</h1>')
    // can't have more than one response
    // res here will be the response for all reqeust
})
*/

// Routing
// /cats => "Meow"
// /Dogs => "woof"
// / => Home

app.get('/', (req, res) => {
    res.send('root')
})

// /r/something -> generic pattern
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Subreddit ${subreddit}</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Subreddit ${subreddit}, id is ${postId}</h1>`)
})

app.post('/cats', (req, res) => {
    res.send('Post req to /cats')
})

app.get('/cats', (req, res) => {
    // console.log("Meow") shows on console
    res.send("Meow")
})

app.get('/dogs', (req, res) => {
    res.send("Woof")
})

app.get('/search', (req, res) => {
    const { q } = req.query
    // console.log(req.query)
    if (!q) {
        res.send('Nothing Searched')
    }
    res.send(`<h1>Search Results for: ${q}</h1>`)
})

// * means all, must come last as all come after will be ignored
app.get('*', (req, res) => {
    res.send('no route found')
})

// runs server ctrl+c to exit
app.listen(8080, () => { // can change ports
    console.log("Hello World! from Port 3000")
})