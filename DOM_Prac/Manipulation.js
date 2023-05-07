document.querySelector('h1');
// return object

document.querySelector('p').innerText;
// return entire first 'p', can manipulate it
// only affect texts -> document.querySelector('h1').innerText = '<h2>Hello</h2>'
// will show up as <h2>Hello</h2> -> not treated as HTML

document.querySelector('p').textContent;
// similar to innerText.
// ignore styling and also show hidden texts
// ex) display: none -> not shown in inner text but shown in textContent

document.querySelector('p').innerHTML;
// return tags
// document.querySelector('h1').innerText = '<h2>Hello</h2>' works here