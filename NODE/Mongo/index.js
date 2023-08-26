const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/');
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