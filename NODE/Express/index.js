const express = require('express');
const app = express();

// console.log(app);

// app.use((req, res) => {
//     console.log("got new request")
//     // console.log(req)
//     // res.send("Hello World")
//     // res.send({ color: 'green' })
//     res.send('<h1>This is title</h1>')
// })

app.get('/', (req, res) => {
    res.send('This is the Homepage')
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Browsing Post ID : ${postId} 
        on the ${subreddit} subreddit</h1>`);
})

app.post('/cats', (res, req) => {
    res.send("Post req to cats")
})

app.get('/cats', (req, res) => {
    res.send('Meow')
})

app.get('/dogs', (req, res) => {
    res.send('Woof')
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('No query strings')
    }
    res.send(`<h1>Search results for : ${q}</h1>`)
})

app.get('*', (req, res) => {
    res.send('Unknown path')
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});