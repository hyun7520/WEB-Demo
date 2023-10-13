const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

// nest image schema
const ImageSchema = new Schema({
    url: String,
    filename: String
})

// use virtual when derived object does not have to be stored
ImageSchema.virtual('thumbnail').get(function () {
    // change url partially to get thumbnail given by Cloudinary
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    // mongoose docs for geoJSON schema
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkUp').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><stong>
    <p>${this.description.substring(0, 20)}...</p>
    `
});


// await Campground.findByIdAndDelete(id);
// findByIdAndDelete triggers findOneAndDelete middleware
// this middeware runs after findOneAndDelete runs
// so when a campground is deleted this middleware runs
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        // doc contains data of deleted campground
        // thorugh doc we can get data of reviews from deleted campground

        // used remove() but newest version of mongoose deprecated remove()
        // change to deleteMany to fix this
        await Review.deleteMany({
            // delete reviews matching ids from reviews in doc
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);