const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty']
    }
})

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

// pre -> before saving hash password
userSchema.pre('save', async function (next) {
    // tell if password has been modified
    // when changing only username and not password
    // no need to rehash password
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);