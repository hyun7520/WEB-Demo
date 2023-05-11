const input = document.querySelector('input');
const h1 = document.querySelector('h1');

// input.addEventListener('change', (e) => {
//     console.log('hello');
//     // only happens when value is changed and blur
// })

input.addEventListener('input', (e) => {
    console.log('hello');
    console.log(e);
    h1.innerText = input.value;
    // soon as typing sth
    // useful for clipboard copying paste
    // click will activate the event
})