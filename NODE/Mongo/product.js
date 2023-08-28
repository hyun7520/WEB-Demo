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
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        default: ['cycling']
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

// productSchema.methods.greet = function () {
//     console.log('Hello');
//     console.log(`from ${this.name}`)
// }

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 });
    // update everything, onsale to true and price to 0
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
}

Product.fireSale()
    .then(res =>
        console.log(res)
    )

// findProduct();

// const bike = new Product({
//     name: 'Mountain Bike',
//     price: 599,
//     color: 'red'
//     // color is not in schema - mongo will ignore
// })

// const bike = new Product({
//     name: 'Bike Helmet',
//     price: 29.50,
//     // default for onSale set to false
//     categories: ['Cycling', 'safety']
// })

// enum
// const bike = new Product({
//     name: 'Cycling Jersey',
//     price: 28.50,
//     categories: ['Cycling'],
//     size: 'XS'
    // throws validations error as 'XS' in not int size enum
// })

// bike.save()
//     .then(data => {
//         console.log('It worked');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Error');
//         console.log(err);
//     })

// Product.findOneAndUpdate(
//     { name: 'Tire Pump' },
//     { price: -99 },
//     { new: true, runValidators: true }
//     // tell mongoose to apply validations when updating
// )
//     .then(data => {
//         console.log('It worked');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Error');
//         console.log(err);
//     })