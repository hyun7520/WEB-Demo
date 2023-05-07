// css : use hyphen, dash 'font-size'
// javascript: camel case 'fontSize'
// css styles don't show up on style object
// only inline style show up

h1.style.fontSize = '20px'
// all has to be string '2em', '2px solid pink'

// could use it for single change but not ideal
// inline styles should be avoided

const links = document.querySelectorAll('a');

for (let link of links) {
    link.style.color = '#006c86';
    link.style.textDecorationColor = 'magenta';
    link.style.textDecorationStyle = 'wavy';
}

window.getComputedStyle(h1)
// returns objects CSSStyleDeclaration
window.getComputedStyle(h1).color
window.getComputedStyle(h1).fontSize