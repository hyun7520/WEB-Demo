const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
    .then(() => {
        console.log('Connected');
    })
    .catch(err => {
        console.log('Error');
        console.log(err);
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({
    name: 'Mountain Bike',
    price: 599,
    color: 'red'
})

bike.save()
    .then(data => {
        console.log('It worked');
        console.log(data);
    })
    .catch(err => {
        console.log('Error');
        console.log(err);
    })