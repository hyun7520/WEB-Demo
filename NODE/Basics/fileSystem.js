const fs = require('fs');
// console.log(fs);

const folderName = process.argv[2] || 'Project';
// if argument at index 2 is not given give default value as 'Project'

try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, '')
    fs.writeFileSync(`${folderName}/app.js`, '')
    fs.writeFileSync(`${folderName}/style.css`, '')
} catch (e) {
    console.log('Error has occured');
    console.log(e)
}


// async ver
// fs.mkdir('test', { resucrsive: true }, (err) => {
//     console.log("In the callback");
//     if (err) throw err;
// });


// sync ver
// fs.mkdirSync('test');
// console.log("I come after MKDIR");

