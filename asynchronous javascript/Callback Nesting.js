// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
//     setTimeout(() => {
//         document.body.style.backgroundColor = 'orange';
//         setTimeout(() => {
//             document.body.style.backgroundColor = 'yellow';
//             setTimeout(() => {
//                 document.body.style.backgroundColor = 'green';
//                 setTimeout(() => {
//                     document.body.style.backgroundColor = 'blue';
//                 }, 1000)
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)

// for simultaneous change you have to calculate the before time
// by nesting the function can set all times 1000

// const delayedColorChange = (newColor, delay, doNext) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//         doNext && doNext();
//     }, delay)
// }

// delayedColorChange('red', 1000);
// delayedColorChange('orange', 2000);
// need to add seconds to next call
// or nest them

// delayedColorChange('red', 1000, () => {
//     delayedColorChange('orange', 1000, () => {
//         delayedColorChange('yellow', 1000, () => {
//             delayedColorChange('green', 1000, () => {
//                 delayedColorChange('blue', 1000, () => {
//                     delayedColorChange('purple', 1000)
//                 })
//             })
//         })
//     })
// });

// too nested : change with promise
const delayedColorChangeNested = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

// delayedColorChangeNested('red', 1000)
//     .then(() => {
//         delayedColorChangeNested('orange', 1000);
//     })
//     .then(() => {
//         delayedColorChangeNested('red', 1000);
//     })

//  or
delayedColorChangeNested('red', 1000)
    .then(() => delayedColorChangeNested('orange', 1000))
    .then(() => delayedColorChangeNested('red', 1000))
    .then(() => delayedColorChangeNested('yellow', 1000))
    .then(() => delayedColorChangeNested('green', 1000))

searchMoviesAPI('amadeus', () => {
    saveToMyDB(movies, () => {
        // if saving to db successful run here
    }, () => {
        // if not run here
    })
}, () => {
    // ex) if API is down or requet faild
})
// search for movie 'amadeus'
// than execute the empty call back () => saveToMyDB
// very common usage

// callback hell
// can get very nested and very ugly
// because have to consider every occasions ex) seconds later do this or that
// promises and async functions to fix this