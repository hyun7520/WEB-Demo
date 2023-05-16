// new Promise((resolve, reject) => {
//     resolve();
//     return resolved promise
// })

const fakeRequest = (url) => {
    new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) {
                resolve('Fake Retrun');
            }
            reject('Request Error');
        }, 1000)
    })
}

fakeRequest('/dogs/1')
    .then((data) => {
        console.log('Done');
        console.log('Data is', data)
    })
    .catch((err) => {
        console.log('err', err);
    })