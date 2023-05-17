// not supported for IE
// nothing new but help clean code
// ASYNC, AWAIT

async function hello() {

}
// return promise object, even when statement empty

const sing = async () => {
    throw new Error("Error")
    // can also throw a string
    // throw "ERROR"
    // return rejected 'Error: ERROR at sing"
    // if error or problem with statement => return rejected promise
    return 'LA LA LA LA'
}
// return resolve 'LA LA LA LA'

sing()
    .then((data) => {
        console.log("Promise Resolve With:", data)
    })
    .catch(err => {
        console.log('Error Rejected')
        console.log(err)
    })
// Promise Resolve With: LA LA LA LA

const login = async (username, password) => {
    if (!username || !password) throw 'Missing Credentials'
    if (password === '1q2w3e4r') return 'Welcome'
    throw 'Invalid Password'
}

login('user', 'asdfa')
    // need to pass correct password
    .then(msg => {
        alert("Logged in", msg);
    })
    .catch(err => {
        alert("Invalid", err)
    })