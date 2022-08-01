const connection = require('../database/connection')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');
const passport = require('../passport/passport');

const userRouter = express.Router();



const handleRegister =  async (req, res) => {
    const { password, username, email } = req.body;
    console.log(password, username, email)
    let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    
    console.log(ipAddress);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const sql = 'INSERT INTO users SET ?';
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
        if(rows.length > 0) {
            res.status(401).json({message: 'Username already in use.'})
        } else {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
                if(result.length > 0) {
                    res.status(401).json({ message: 'Email already in use.'})
                } else {
                    connection.query(sql, {username: username, email: email, password: hashedPassword, ipAddress: ipAddress, date: new Date().toISOString()}, (err, resultInsert) => {
                        if(resultInsert) {
                            res.send({ message: 'Works'});
                            console.log('works');
                        } else {
                            console.log(err)
                        }
                    })
                }
            })
        }
    })
}

const handleLogin = async (req, res, done) => {
    const cookies = req.cookies;
    console.log(cookies);
    const { user, password } = req.body;
    console.log(user, password);
    
   connection.query('SELECT * from users WHERE username = ?', [user], (err, rows) => {
    console.log(rows);
        if(rows.length > 0) {
            bcrypt.compare(password, rows[0].password, (error, response) => {
                if(response) {


                    
                    const id = rows[0].uid
                    const accessToken = jwt.sign(
                        {
                           "UserInfo": {
                                'username': rows[0].username
                           }
                        }, 
                            process.env.jwtsecret, {
                            expiresIn: '10s'
                        })
                    const last_login = rows[0].last_login;
                    const newRefreshToken = jwt.sign(
                        {
                            'username': rows[0].username,
                            
                        },
                        process.env.jwtsecret,
                        { expiresIn: '15s' }
                    );

                    let newRefreshTokenArray = !cookies?.jwt ? rows[0].refreshToken : connection.query('UPDATE users SET refreshToken = ? where username = ?', [0, user])
                    
                    if(cookies?.jwt) {
                        const refreshToken = cookies.jwt;
                        const foundToken = rows[0].refreshToken;
                        
                        if(!foundToken) {
                            newRefreshTokenArray = []
                        }
                        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})
                    }

                    connection.query('UPDATE users SET refreshToken = ? where username = ?', [newRefreshToken, user])



                    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })


                    console.log( {accessToken } )
                    res.json({ accessToken })
        } else {
            res.status(401).json({ 'message': 'Wrong password'})
        }
    })
        } else {
            res.status(401).json({ 'message': "User doesn't exist"})
        }
   })
}
const handleLoginPassport = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.log(err);
            return;
        }
        if(!user) {
            res.status(401).json(info.message)
            return;
        }
        req.logIn(user, (err) => {
            if(err) {
                console.log(err);
                console.log('session wrong')
            } else {
                const cookies = req.cookies;
                console.log(cookies);

                const accessToken = jwt.sign(
                    {
                       "UserInfo": {
                            'username': user.username
                       }
                    }, 
                        process.env.jwtsecret, {
                        expiresIn: '10s'
                    })
                const last_login = user.last_login;
                const newRefreshToken = jwt.sign(
                    {
                        'username': user.username,
                        
                    },
                    process.env.jwtsecret,
                    { expiresIn: '15s' }
                );

                // let newRefreshTokenArray = !cookies?.jwt ? user.refreshToken : connection.query('UPDATE users SET refreshToken = ? where username = ?', [0, user])
                
                if(cookies?.jwt) {
                    const refreshToken = cookies.jwt;
                    const foundToken = user.refreshToken;
                    
                    if(!foundToken) {
                        newRefreshTokenArray = []
                    }
                    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})
                }

                connection.query('UPDATE users SET refreshToken = ? where username = ?', [newRefreshToken, user.username])



                res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })


                console.log( {accessToken } )
                res.json({ accessToken })














                // res.json(req.user);

            }
        })
    })(req, res, next);
}


// const handleLogout = async (req, res) => {
//     const cookies = req.cookies;

//     if(!cookies.jwt) return res.sendStatus(201);
    
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})

//     res.sendStatus(204);

// }



const getUserInfo = (req, res) => {

    const { username } = req.body;
    console.log(username);
    connection.query('SELECT * FROM users WHERE username = ? ', [req.params.username], (err, result) => {
        console.log(result);
        if(!err) {
            res.json({ result })
        } else {
            console.log(err);
        }
    })
    
}



module.exports = {
    handleRegister,
    handleLogin,
    getUserInfo,
    handleLoginPassport
    
}