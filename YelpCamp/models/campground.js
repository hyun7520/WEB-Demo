const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

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