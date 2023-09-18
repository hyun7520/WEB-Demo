const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    // generate salt
    // first argument -> times bcrypt takes to calculate hash
    // increase the difficulty
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    // return boolean
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log('Logged In');
    } else {
        console.log('Try Again');
    }
}


// hashPassword('monkey');

// provide bcrypt with input and hashed code
// bcryt will automatically check if match
login('monkey', '$2b$12$eLxLNoFm9c54zoxzsnt1qeZTzhMCkWhpxWERAyBf3G1F/AcWs6rG.');

// create salt and hash at same time
const hashPassword2 = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}