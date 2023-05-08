// Without touching index.html, please use JavaScript to create exactly 100 new button elements! Add each new button inside the container element provided in index.html.  Unfortunately, Udemy's exercise tool does not support to the append method, so you will need to use appendChild.  Here are the steps:

// Create exactly 100 new button elements

// Each button must have some text inside of it (it doesn't matter what)

// Each button must be appended inside the container div.

// <!DOCTYPE html>

// <head>
//     <title>100 Buttons!</title>
// </head>

// <body>
//     <!--DO NOT TOUCH THIS FILE PLEASE!-->
//     <h1>Look At All My Buttons!</h1>
//     <div id="container">
    
//     </div>
// </body>

// </html>

const container = document.querySelector('#container');

for (let i = 0; i < 100; i++) {
    const button = document.createElement('button');
    button.innerText = 'Hey!';
    container.appendChild(button);
}