const math = require('./math.js');
// need to make sure the reference
// this case math is in the same directory. so add ./

// console.log(math);
// console.log(math.square(2));
// returns {} empty

// prac require entire directory
const colors = require('colors');
// need to be in the same directory: locally installed
const rainbow = require('./rainobw');

console.log(rainbow)

// node app.js
// can find that all directory is called


// npm i -g module
//  -g: install globally
// npm link module


// package.json file is useful for other people to try out the code
// downloading code from github, move to the folder and type npm install
// it will automatically search package.json and install the dependencies 