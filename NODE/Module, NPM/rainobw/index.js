// index file : particular name in node, entry / main file
// when requiring a directory node is going to look for the index file
const red = require('./red')
const orange = require('./orange')
const yellow = require('./yellow')

const rainbow = [red, orange, yellow]

module.exports = rainbow