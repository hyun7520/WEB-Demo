// using npm install to install packages

// this will create node-modules which contains downloaded package files.
// -> don't modify it, don't create directory with same name

// when pushing project to github
// -> push package.json and package-lock.json
// package.json show which package was used.
// package-lock.json makes npm to establish same dependency tree to when the project was made.
// -> it makes np to install same versions to when project was pushed.
// same as node-modules directory -> don't modify or create files with same name.

// on index.js use require to use the package
// when referencing the package just type it's name

// installing packages for each directory is better in version control
// can also install globally by adding '-g'
// -> npm i -g cowsay
// installing globally may occur error as it access the 'highest level' node_modules directory
// -> local/lib/node_modules
// sudo chown -r $USER /usr/local/lib/node_modules to fix this
// npm link [package] to access globally installed package