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

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

// virtuals will behave as an actual property
personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function () {
    this.first = 'HOHOHO';
    this.last = 'HAPPY';
    console.log('About To Save')
})

personSchema.post('save', async function () {
    console.log('Just Saved')
})

const Person = mongoose.model('Person', personSchema);