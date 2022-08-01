
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session =  require('express-session');
const connection = require('../database/connection');
const bcrypt = require('bcryptjs');



passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true

},  (req,username, password, done) => {
    console.log('user', username)
    console.log('password', password);
    console.log('done', done);
    console.log('......passport js.......');
    console.log(password);
        connection.query('SELECT * FROM users WHERE username = ? ', [username], async (err, result) => {
            if(result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(response) {
                        console.log(result[0])
                        return done(null, result[0])
                    } else {
                        return done(null, false, { message: 'Wrong password'})
                    }
                })
            } else {
                return done(null, false, { message: "Username does not exist"})
            }
        })
    }))

    
passport.serializeUser((user, done) => {
    done(null, user.uid)
})

passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM users WHERE uid = ?', [id], (err, rows) => {
        done(err, rows[0])
    })
})

module.exports = passport;