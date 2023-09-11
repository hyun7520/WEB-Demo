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

// one 
const userSchema = new Schema({
    username: String,
    age: Number
})

// to many
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    // const user = new User({
    //     username: 'chiekenfnan99',
    //     age: 61
    // });
    const user = await User.findOne({ username: 'chiekenfnan99' })
    // const t1 = new Tweet({
    //     text: 'I love chickens',
    //     likes: 50
    // });
    const t2 = new Tweet({
        text: 'Bock Bock bock',
        likes: 25
    });
    t2.user = user;
    user.save();
    t2.save();
}

const findTweets = async () => {
    // name of the field to populate
    // const tweetSchema = new Schema({
    //     text: String,
    //     likes: Number,
    //     user: { type: Schema.Types.ObjectId, ref: 'User' }
    // })
    // populating 'user' field
    // second argument: only populate passed field
    const t = await Tweet.findOne({}).populate('user', 'username');
    console.log(t);
}

findTweets();