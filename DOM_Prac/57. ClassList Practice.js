// In index.html, you'll find 6 <li> elements, two of which have the 'highlight' class applied to them.

// Please use JavaScript and the classList property to invert which elements have the highlight class.

// Basically iterate over all the <li> elements and toggle the class of 'highlight' on each one.   Your end result should look like this:

// <!DOCTYPE html>

// <head>
//     <title>ClasList</title>
//     <!--LEAVE THESE LINES ALONE, PLEASE! THEY MAKE THE LIVE PREVIEW WORK!-->
//     <script src="node_modules/babel-polyfill/dist/polyfill.js" type="text/javascript"> </script>
//     <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

// </head>

// <body>
//     <!--LEAVE THIS FILE ALONE!-->
//     <ul>
//         <li>Hello</li>
//         <li class="highlight">Hello</li>
//         <li>Hello</li>
//         <li>Hello</li>
//         <li class="highlight">Hello</li>
//         <li>Hello</li>
//     </ul>
// </body>

// </html>

const list = document.querySelectorAll('li');

for (let li of list) {
    li.classList.toggle('highlight');
}