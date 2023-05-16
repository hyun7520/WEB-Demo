// THE CALLBACK VERSION
const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure('Connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
    }, delay)
}
// THE PROMISE VERSION 
const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}

// makeRequest(() => {
//     if works
// }, () => {
//     if not 
// })
// fakeRequestCallback('books.com',
//     function (res) {
//         console.log('Workd');
//         console.log(res);
//         fakeRequestCallback('books.com/page2',
//             function (res) {
//                 console.log('Worked2');
//                 console.log(res);
//                 fakeRequestCallback('books.com.page3',
//                     function (res) {
//                         console.log('Worked3');
//                         console.log(res);
//                     }, function (err) {
//                         console.log('Error3', err);
//                     })
//             },
//             function (err) {
//                 console.log('Error2', err);
//             })
//     }, function (err) {
//         console.log('Error', err);

//     }
// )
// too nested, dirty -> came promises
// IE not supported

// Promise is an object
// 3 states: pending, resolved, rejected
// run code when resolved or rejected
// attach callback to the promise rahter than passing callback into function
// wait for object promise to return



// fakeRequestPromise('yelp.com/api/coffee/page1')
//     .then(() => {
//         console.log("IT WORKED!!!!!! (page1)")
//         fakeRequestPromise('yelp.com/api/coffee/page2')
//             .then(() => {
//                 console.log("IT WORKED!!!!!! (page2)")
//                 fakeRequestPromise('yelp.com/api/coffee/page3')
//                     .then(() => {
//                         console.log("IT WORKED!!!!!! (page3)")
//                     })
//                     .catch(() => {
//                         console.log("OH NO, ERROR!!! (page3)")
//                     })
//             })
//             .catch(() => {
//                 console.log("OH NO, ERROR!!! (page2)")
//             })
//     })
//     .catch(() => {
//         console.log("OH NO, ERROR!!! (page1)")
//     })


// THE CLEANEST OPTION WITH THEN/CATCH
// RETURN A PROMISE FROM .THEN() CALLBACK SO WE CAN CHAIN!
fakeRequestPromise('yelp.com/api/coffee/page1')
    // when resolved .then is ran
    .then((data) => {
        console.log("IT WORKED!!!!!! (page1)")
        console.log(data)
        return fakeRequestPromise('yelp.com/api/coffee/page2')
    })
    .then((data) => {
        console.log("IT WORKED!!!!!! (page2)")
        console.log(data)
        return fakeRequestPromise('yelp.com/api/coffee/page3')
    })
    .then((data) => {
        console.log("IT WORKED!!!!!! (page3)")
        console.log(data)
    })
    // when rejected .catch is ran
    .catch((err) => {
        console.log("OH NO, A REQUEST FAILED!!!")
        console.log(err)
    })



