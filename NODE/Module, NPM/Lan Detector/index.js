// import { franc, francAll } from 'franc'
// es6 modules dont support require
// changing to es6 module: add "type": "module" at package.json 
// this project is made with franc 5.0.0 which supports require
const franc = require('franc');
const langs = require('langs');
const colors = require('colors');
const input = process.argv[2];
const trans = franc(input);
if (trans === 'und') {
    console.log("No Match".red);
}

const language = langs.where("3", trans);
console.log(language.name.green)