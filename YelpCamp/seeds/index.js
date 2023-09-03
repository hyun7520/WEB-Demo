const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp', {
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

// pick a random element from a sample
// used to pick places and descriptors from datas at seedHelpers
const sample = array => array[Math.floor(Math.random() * array.length)];

// check to see if DB is connected before seeding it with data
const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // c.save();
    for (let i = 0; i < 50; i++) {
        // 1000 cities in given seed data
        const random1000 = Math.floor(Math.random() * 1000);
        // create data with city and state
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        // save 50 data with city, state and title
        await camp.save();
    }
}

seedDB()
    .then(() => {
        // close the connection to mongoose when sedd data is inserted
        // this will make console to exit node as well
        mongoose.connection.close()
    })