const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const Campground = require('./models/campground');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

main()
    .then(() => {
        console.log('Connected to Mongo');
    })
    .catch(err => {
        console.log('Error');
        console.log(err);
    });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
})

app.listen(3000, () => {
    console.log('Connected to Port 3000');
})