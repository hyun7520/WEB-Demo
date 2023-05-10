document.querySelector('button').addEventListener('click', (evt) => {
    console.log(evt);
    // even if parameter is empty event is given
    // event is made up of coordinates of click client x, client y and so on
})

const input = document.querySelector('input');
input.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp':
            console.log('up');
        case 'ArrowDown':
            console.log('down');
        default:
            console.log('Ignored');
    }
})

// pressed q, prints key: 'q' amd code: 'keyQ'

// input.addEventListener('keyup', () => {
//     console.log('Key Up');
// })

// e.key : letter or character generated
// e.code : actual location on keyboard, physical location