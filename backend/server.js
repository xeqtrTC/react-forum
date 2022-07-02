const express = require('express')
const cors  = require('cors');
const bodyParser  = require('body-parser');
const cookieParser  = require('cookie-parser');
const jwt  = require('jsonwebtoken');
const credentials = require('./credentials');
const session  =  require('express-session');
const dotenv  = 'dotenv';
const verifyJWT = require('./verifyJWT');
const connection = require('./database/connection')
const corsOptions = require('./corsOptions')


require('dotenv').config();
const app = express(); // express
const port = 5000; // port of the backend server
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()); 
app.use(cookieParser());
// app.use(session({
//     key: 'userId',
//     secret: 'forum',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60 * 60 * 24,
//     },
// }))




app.use('/api/users', require('./routes/users'));

app.use('/api/category', require('./routes/posts.js'));
app.use(verifyJWT);






app.listen(5000, () => {
    console.log(`server radi na portu ${port}`)
}) 