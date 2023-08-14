const add = (x, y) => x + y;

const PI = 3.14159265;

const square = x => x * x;

// only module.exports will be exported
// 

module.exports.add = add;
module.exports.PI = PI;
module.exports.square = square;

// const { PI, square } = require.('./math');

const math = {
    add: add,
    PI: PI,
    square: square
}
module.exports = math;

// exports.square = square;
// exports.PI = PI;

