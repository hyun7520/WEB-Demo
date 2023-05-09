const btn = document.querySelector('#V2');

btn.onclick = () => {
    console.log("Clicked");
}

const scream = () => {
    console.log("Mouse entered")
}

btn.onmouseenter = scream;

// btn.onclick = console.log("Clicked");
// will execute right awat - so wrap in function

addEventListener
// better version

const btnV3 = document.querySelector('#V3');
btnV3.addEventListener('click', () => {
    alert("Clciked!");
})
// dblclcik = double click
// mouseup : when button is released

const twist = () => {
    console.log('twist');
}

const shout = () => {
    console.log('shout');
}

const btn4 = document.querySelector('#TandS');

btn4.addEventListener('click', twist, { once: true });
btn4.addEventListener('click', shout);
// btn4.onclick(twist)
// btn4.onclick(shout)
// shout will overwrite twist but by using addEventListener can do both
// will happend only once first time