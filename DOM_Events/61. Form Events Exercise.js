// Time to get some practice working with forms and form events! index.html already has a form element that contains two < input > elements, one for quantity and one for a product name.index.html also contains an empty < ul > where you will append new < li > 's.  Watch the gif at the bottom for an overview of how your code should work. Your task is to follow these steps:

// Listen for the form submission

// When the form is submitted, prevent the default behavior

// Grab the quantity input value and the product input value

// Create a new < li > element.Set the text on the new < li > to include the quantity and product name from the form.

// Append the new < li > to the < ul > on the page

// Reset the inputs

// <!DOCTYPE html>

// <head>
//     <title>Grocery List</title>
//     <!--LEAVE THESE LINES ALONE, PLEASE! THEY MAKE THE LIVE PREVIEW WORK!-->
//     <script src="node_modules/babel-polyfill/dist/polyfill.js" type="text/javascript"> </script>
//     <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

// </head>

// <body>
//     <h1>Grocery List</h1>
//     <form action="/nowhere">
//         <label for="item">Enter A Product</label>
//         <input type="text" id="product" name="product">
//         <label for="item">Enter A Quantity</label>
//         <input type="number" id="qty" name="qty">
//         <button>Submit</button>
//     </form>

//     <ul id="list"></ul>
// </body>

// </html>

const form = document.querySelector('form');
const list = document.querySelector('#list');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = form.elements.product;
    const qty = form.elements.qty;
    addList(product.value, qty.value);

    product.value = '';
    qty.value = '';

})

const addList = (product, qty) => {
    const newList = document.createElement('li');
    list.appendChild(newList);
    newList.innerText = `${qty} ${product}`;
}