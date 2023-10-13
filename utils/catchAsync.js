module.exports = func => {
    // accepts a function
    return (req, res, next) => {
        // executes a function and send any errors caught to next
        func(req, res, next).catch(next);
    }
}