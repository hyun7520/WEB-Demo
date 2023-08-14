const math = require('./math.js');
// import modules by using require
// can skip .js
// this case math is in the same directory. so add ./

const { PI, square } = require('./math');
console.log(PI);
console.log(square(2));

// prac for requiring entire directory
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