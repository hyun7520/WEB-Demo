const newImg = document.createElement('img')
// create empty img
// need source and append
newImg.src = 'src'

document.body.appendChild(newImg);
// append as the last child
// newImg.classList.add('square') to make it smaller

const newH3 = document.createElement('h3');
newH3.innerText = 'new H3';
document.body.appendChild(newH3)

.append
// IE not supported
// more flexible : multiple insert, can pass text
const p = document.querySelector('p')
p.append('hello')
// append text to the end of the paragraph
// doesn' work with appendchild
p.append('Hello', 'World')

.prepend
// IE not supported
p.prepend('hello')

.insertAdjacentElement
// beforebegin afterbegin beforeend afterend
// .after .before