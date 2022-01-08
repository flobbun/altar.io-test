const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://localhost/nodomain';

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
.then(db => console.log('Database connected successfully ♦'))
.catch(err => console.error(err));