const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');

const Product = require('./models/product');

// connect to mongoose
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand2');
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetables', 'dairy'];

// create a function to pass in an entire callback
// replace try, catch error handling
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next)
            .catch(e => next(e))
    }
}

app.get('/products', wrapAsync(async (req, res, next) => {

    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }

}))

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

// when handling errors for async function remember to add 'next' int the arguments
app.post('/products', wrapAsync(async (req, res, next) => {

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);

}))

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
})

app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`)
}))

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    // try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
        // On async function express can't catch this code
        // error may come from findById so wrap it in try and catch
        // also with try , catch phrase error thrown here can also be catched
        // no need for return function below
        throw new AppError('No product', 404);
        // need to pass this AppError to next
        // return next(new AppError('No product', 404));
        // without reuturn code below will run
    }
    res.render('products/show', { foundProduct });
    // } catch (e) {
    //     next(e);
    // }
}))

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

const handleValidationErr = err => {
    console.log(err);
    return new AppError(`validation failed... ${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err);
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Error' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})