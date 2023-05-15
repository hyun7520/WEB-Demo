// single thread
// one line of code at a time

const newTodo = input.value;
saveToDatabase(newTodo);
// saveToDatabase take 5sec so all progress halts for 5sec?
// browser do some work for the javascript
// javascript 'hand off' that it can't handle
// ex) setTimeOut, request
// javascript recognize web APIs in call stack, pass them off to browser
// when browser finish the work js takes over and execute the rest
input.value = ''

console.log('Hello'); // js cna do this
setTimeout(() => { // web API function
    console.log('world');
}, 3000) // browser tells javascript when time is up
// the function is stacked in the call back queue and executed
console.log('!'); // js do here

// using loupe or console
// can check that api is passed