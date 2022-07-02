const connection = require('../database/connection')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');

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
            res.send({message: 'Something went wrong. Try again.'})
        } else {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
                if(result.length > 0) {
                    res.send({ message: 'Something went wrong. Try again.'})
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

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    const { user, password } = req.body;
    console.log(user, password);
    
   connection.query('SELECT * from users WHERE username = ?', [user], (err, rows) => {
        if(rows.length > 0) {
            bcrypt.compare(password, rows[0].password, (error, response) => {
                if(response) {


                    
                    const id = rows[0].uid
                    const accessToken = jwt.sign({
                        "UserInfo": {
                            'username': rows[0].username,
                            'isAdmin': rows[0].isAdmin,
                            'isModerator': rows[0].isModerator,
                            'isBanned': rows[0].isBanned
                        }
                    }, process.env.jwtsecret, {
                        expiresIn: 3000
                    })
                    const last_login = rows[0].last_login;
                    const newRefreshToken = jwt.sign(
                        {
                            'username': rows[0].username,
                            
                        },
                        process.env.jwtsecret,
                        { expiresIn: 300 }
                    );
                    
                    // let newRefreshTokenArray = !cookies?.jwt ? rows[0].refreshToken : rows[0].refreshToken.filter((rt) => rt !== cookies.jwt);

                   
                    // if (cookies?.jwt) {
                    //     const refreshToken = cookies.jwt;
                    //     const foundToken = rows[0].refreshToken.exec();

                    //     if(!foundToken) {
                    //         newRefreshTokenArray = [];
                    //     }
                        
                    //     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})

                    // }
                    const newDate = new Date().toISOString();
                    // rows[0].refreshToken = [...newRefreshTokenArray, newRefreshToken]
                    connection.query('UPDATE users SET last_login = ? where uid = ?', [newDate, rows[0].uid])
                    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})
                    const response = {
                        message: 'Logged successfully',
                        accessToken,
                        newRefreshToken
                    }
                    res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})
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

const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies.jwt) return res.sendStatus(201);
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})

    res.sendStatus(204);

}


const handleRefreshToken = async (req, res) => {
    const { username } = req.body
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    
    connection.query('SELECT * from users where username = ?', [username], (err, result) => {
        if(!result) {
            jwt.verify(
                refreshToken,
                jwtsecret,
                async (err, decoded) => {
                    if(err) return res.sendStatus(403);

                    const hackedUser = rows[0].decoded.username;
                    hackedUser.refreshToken = [];
                    const result = hackedUser.save();
                }    
            )
            return res.sendStatus(403);
        }
        const newRefreshTokenArray = rows[0].refreshToken.filter((rt) => rt !== refreshToken);

        
    })
}

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout
}