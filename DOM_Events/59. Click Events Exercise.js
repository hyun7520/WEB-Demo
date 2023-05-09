// Let's get some practice using addEventListener. I've provided you with two buttons, each with an id: 'hello' and 'goodbye'.Your goal is to add a click listener to each button.

// When the hello button is clicked, you should console.log "hello"

// When the goodbye button is clicked, you should console.log "goodbye"

// <!DOCTYPE html>

// <head>
//     <title>ClasList</title>
//     <!--LEAVE THESE LINES ALONE, PLEASE! THEY MAKE THE LIVE PREVIEW WORK!-->
//     <script src="node_modules/babel-polyfill/dist/polyfill.js" type="text/javascript"> </script>
//     <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

// </head>

// <body>
//     <h1>Click These Buttons</h1>
//     <p>And Prepare To Have Your Mind Blown</p>
//     <button id="hello">Hello</button>
//     <button id="goodbye">Goodbye</button>
// </body>

// </html>

document.querySelector('#hello').addEventListener('click', () => {
    console.log('hello');
});
document.querySelector('#goodbye').addEventListener('click', () => {
    console.log('goodbye');
});