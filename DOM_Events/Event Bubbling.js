const div = document.querySelector('div');
const button = document.querySelector('#color');

button.addEventListener('click', (e) => {
    div.style.backgroundColor = randColor();
    e.stopPropagation;
    // stop further progress
})

div.addEventListener('click', () => {
    div.classList.toggle('hide');
    // change the color and hid the div
})

const randColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

