const express = require('express');
const cors  = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser  = require('body-parser');
const passport = require('passport');
const cookieParser  = require('cookie-parser');
const jwt  = require('jsonwebtoken');
const credentials = require('./credentials');
const dotenv  = 'dotenv';
const verifyJWT = require('./verifyJWT');
const connection = require('./database/connection');
const corsOptions = require('./corsOptions');
const multer = require('multer');
const sessionStore = require('./database/sessions');


require('dotenv').config();
require('./passport/passport')
const app = express(); // express
const port = 5000; // port of the backend server
app.use(credentials);
app.use(
    cors({
         origin: "http://localhost:3000", // allow to server to accept request from different origin
         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
         credentials: true, // allow session cookie from browser to pass through
   })
);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()); 
app.use(session({
    secret: 'forum',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}))
app.use(cookieParser('forum'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/refresh', require('./routes/refreshtokenapi'))
app.use('/api/users', require('./routes/users'));


app.use('/api/category', require('./routes/posts'));




const storage = multer.diskStorage({})

const upload = multer({ storage })



app.post('/upload', upload.single('image'), async (req, res) => {
    const fileStr = req.body.data
try {

    const uploadResponse = await cloudinary.uploader.upload(req.file.path);
    console.log(uploadResponse);
    const {public_id} = uploadResponse;
    console.log(public_id);
    
    res.json({ public_id })
} catch (err) {
    console.log(err);
}
})








app.listen(5000, () => {
    console.log(`server radi na portu ${port}`)
}) 