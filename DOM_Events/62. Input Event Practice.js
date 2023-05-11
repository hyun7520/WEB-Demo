// It's time to practice working with the input event!  In the index.html file, you'll find an < h1 > and an < input type = "text" > element.Please do not change anything in index.html!  In app.js, write code that meets these requirements:

// The h1 should start with the text "Enter Your Username"(I've done that for you, already in the markup)

// Whenever an input event is fired on the < input > element, update the < h1 > so that it displays "Welcome, " plus the current value from the text input.Take a look at the gif below to see how it should work.

// If the < input > goes back to being empty, update the < h1 > so that it once again says "Enter Your Username"

// <!DOCTYPE html>

// <head>
//     <title>Input Event</title>
//     <!--LEAVE THESE LINES ALONE, PLEASE! THEY MAKE THE LIVE PREVIEW WORK!-->
//     <script src="node_modules/babel-polyfill/dist/polyfill.js" type="text/javascript"> </script>
//     <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

// </head>

// <body>
//     <h1>Enter Your Username</h1>
//     <input type="text" id="username">
// </body>

// </html>

const input = document.querySelector('input');
const h1 = document.querySelector('h1');

input.addEventListener('input', () => {
    const username = input.value;
    h1.innerText = `Welcome, ${username}`;

    if (username.length === 0) {
        h1.innerText = 'Enter Your Username';
    }
})