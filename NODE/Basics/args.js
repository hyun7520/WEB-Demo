console.log("args example");
const args = process.argv.slice(2);
for (let arg of args) {
    console.log("Hello " + arg)
}

// argv will return all command line arguments