const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetables', 'dairy'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
})

// this comes before show render
// 'new' in products/new is considerd as an id
// will cause an infinite loop
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    // altough /ptoducts has same directory to showing all index
    // hitting refresh will make post request and create same data, not showing index page
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
})

// put changes all, pathc changes portion
app.put('/products/:id', async (req, res) => {
    // console.log(req.body);
    // res.send('PUT');
    const { id } = req.params;
    // validation check is off by default for findByIdAndUpdate
    // turn on the validation check on third argument
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`)
})

// using Mongo's default id
// product name is not guarantied to be unique
// space and characters in name string might not be safe for URL
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/show', { foundProduct });
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})