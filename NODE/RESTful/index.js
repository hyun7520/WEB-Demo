const express = require('express');
const app = express();

// for every single request 
// req.body will be now shown
app.use(express.urlencoded({ extended: true }))
// to parse json type body
app.use(express.json())

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