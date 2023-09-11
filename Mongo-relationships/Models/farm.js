const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo', {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // this is option is not needed after ver 6
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

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    seaon: {
        type: String,
        enum: ['Spring', 'Summer', 'Autumn', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [
        // pull out mongoose.Schema as it gets long
        // { type: mongoose.Schema.Types.ObjectId }
        // ref
        { type: Schema.Types.ObjectId, ref: 'Product' }
    ]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     {
//         name: 'Melon',
//         price: 4.99,
//         season: 'Summer'
//     },
//     {
//         name: 'Carrot',
//         price: 0.99,
//         season: 'Spring'
//     },
//     {
//         name: 'Apple',
//         price: 0.99,
//         season: 'Autumn'
//     }
// ])

const makeFarm = async () => {
    const farm = new Farm({
        name: 'Full Belly Farms',
        city: 'Guinda, CA'
    });
    const melon = await Product.findOne({ name: 'Melon' });
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const carrot = await Product.findOne({ name: 'Carrot' });
    farm.products.push(carrot);
    await farm.save();
    console.log(farm);
}

Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')
    .then(farm => console.log(farm))