const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    } else {
        res.send('not an admin')
    }
})

router.get('/topsecret', (req, res) => {
    res.send('this is top secret');
})

router.get('/deleteall', (req, res) => {
    res.send('Deleted everything');
})

module.exports = router;