// A js runtime
// an implementation of js outside of browser
// create server, write server side logic

// REPL: continue to listen, use for debug or try new features, Tools
// input 1 + 2 = 3
// "hello" + "World" = "helloWorld"
// global: window object

// setTimeout(() => consolge.log("hello"),3000)
// -> print hello
// node runs on javascript

// in cmd create file
// touch file.js

for (let i = 0; i < 10; i++) {
    console.log("Hello World");
}

// excute : node file.js

console.log(process.argv);
// return path to the file

const args = process.argv.slice(2);
for (let arg of args) {
    console.log(`hello, ${arg}`);
}

// node file.js dog cat
// hello, dog
// hello, cat

// async and sync versions of making, deleting files
// syn will stop all process until it's finished

const fs = require('fs');
console.log(fs);

// Async ver
// fs.mkdir('route', { recursive: true }, (err) => {
//     console.log("inside call back mkdir")
//     if (err) throw err;
// })
// console.log("After mkdir")

// sync ver
// fs.mkdirSync('cats');
// console.log("After mkdir")

const fs = require('fs');
// node file.js path
const folderName = process.argv[2]

try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`)
    fs.writeFileSync(`${folderName}/app.css`)
    fs.writeFileSync(`${folderName}/app.js`)
} catch (e) {
    console.log(e);
}

