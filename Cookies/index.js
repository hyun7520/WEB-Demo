const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    const { name = 'Anonymous' } = req.cookies;
    res.send(`Hello, ${name}`);
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Jason Harry');
    res.cookie('animal', 'Shrimp');
    res.send('Sent you a cookie');
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('signed');
})

app.get('/verifyfruit', (req, res) => {
    res.send(req.signedCookies);
})

app.listen(3000, (req, res) => {
    console.log('Listening on Port 3000');
})