// ex) array
// share a __proto__ : contains all method
// rather than having seperate method on every array
// one proto and reference to proto

Array.prototype
// returns everything about prototype, like an template
// can add, create own prototype
String.prototype.popError = () => alert("Error")

const cat = "Blue"
cat.popError()
// new function 'popError' is added to the Prototype
// so String cat also has that new function
// returns alert Error

String.prototype.yell = function () {
    return `OMG ${this.toUpperCase()}`;
}

const hello = 'hello';

hello.yell();

Array.prototype.pop = function () {
    return "pop removed";
}

const nums = [1, 2, 3];
nums.pop();

// .prototype and __proto__
// .prototype : template object, actual object
// __proto__ : reference