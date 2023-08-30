const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');

// connect to mongoose
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
    .then(() => {
        console.log('Mongo Connected');
    })
    .catch(err => {
        console.log('Error');
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// to have access to req.body, have it parsed
// need to import middleware
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
})

// this comes before show render
// 'new' in products/new is considerd as an id
// will cause an infinite loop
app.get('/products/new', (req, res) => {
    res.render('products/new');
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    // altough /ptoducts has same directory to showing all index
    // hitting refresh will make post request and create same data, not showing index page
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id/edit', async (req, res) => {
    const product = await Product.findById(id);
    res.render('products/edit', { product });
})

// using Mongo's default id
// product name is not guarantied to be unique
// space and characters in name string might not be safe for URL
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/show', { foundProduct });
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})