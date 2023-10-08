const mongoose = require('mongoose');
const cities = require('./cities');
const axios = require('axios');
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

// using API
// getting random image using 'https://source.unsplash.com/random' will be deprecated
async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'bajcA4DFoMYiaum7PqH2Zi7hLwKEIYtxQmUXtH42Hwo',
                collections: 483251,
            },
        });
        return resp.data.urls.small
    } catch (err) {
        console.error(err);
    }
}

// check to see if DB is connected before seeding it with data
const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // c.save();
    for (let i = 0; i < 50; i++) {
        // 1000 cities in given seed data
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        // create data with city and state
        const camp = new Campground({
            author: '650d597943e0964ebb6c0df1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: await seedImg(),
            images: [
                {
                    url: 'https://res.cloudinary.com/dsr7sxgt4/image/upload/v1696318909/YelpCamp/rnkdjopepdzmnpk27rq3.webp',
                    filename: 'YelpCamp/rnkdjopepdzmnpk27rq3'
                },
                {
                    url: 'https://res.cloudinary.com/dsr7sxgt4/image/upload/v1696318909/YelpCamp/z1mbz7a2or4z7ctdmtib.webp',
                    filename: 'YelpCamp/z1mbz7a2or4z7ctdmtib'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eveniet magnam et at laborum repellat eaque, aperiam odio tempore, esse nemo repudiandae blanditiis beatae illum, fugiat ipsum atque perferendis ullam!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
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