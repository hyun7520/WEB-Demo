const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shleters');
const dogRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin');

// first argument is prefix
// could prfix with '/shelter' but alredy created route
// so default it to nothing
app.use('/shelters', shelterRoutes);
app.use('/dogs', dogRoutes);
app.use('/admin', adminRoutes);


app.listen(3000, () => {
    console.log('On Port 3000');
})