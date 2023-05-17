

const delayedColorChangeNested = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}


async function rainbow() {
    await delayedColorChangeNested('red', 1000);
    console.log('Hello');
    // show up with red change
    await delayedColorChangeNested('orange', 1000);
    await delayedColorChangeNested('yellow', 1000);
    // without awiat 'red' won't work as 'orange' won't wait
    // keep adding await to continue
    await delayedColorChangeNested('green', 1000);
    await delayedColorChangeNested('blue', 1000);
    await delayedColorChangeNested('indigo', 1000);
    await delayedColorChangeNested('violet', 1000);
    return "All Done"
    // return will make this function resolved promise
}

// so using .then is possible
rainbow()
    .then(() => console.log("End of Rainbow"))

// or without using .then
// more clear
async function printRainbow() {
    await rainbow();
    console.log("End of Rainbow")
}

printRainbow();

