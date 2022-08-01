const connection = require('./database/connection');
const jwt = require('jsonwebtoken');
const { connect } = require('./database/connection');

const handleRefreshToken = async (req, res) => {
    const tokennumber = 0

    const cookies = req.cookies;
    console.log('refresh tokeeeeeeeeeeen')
    console.log('handle refresh ', cookies.jwt);
    if(!cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log('refresh token' , refreshToken)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})

    connection.query('SELECT * from users WHERE refreshToken = ?', [refreshToken], (error, result) => {
        console.log('refres' , result);
        if(!result) {
            jwt.verify(
                refreshToken,
                process.env.jwtsecret,
                async (err, decoded) => {
                    if(err) return res.sendStatus(403);
                }
            )
            return res.sendStatus(403);
        }

        // const newRefreshTokenArray = connection.query('UPDATE users SET refreshToken = ? WHERE username = ?', [tokennumber, result.username])
    
        jwt.verify(
            refreshToken,
            process.env.jwtsecret,
            (err, decoded) => {
                if(err) {
                    connection.query('UPDATE users SET refreshToken = ? WHERE username = ?', [tokennumber, result.username])
                    console.log(err);
                }
                console.log('decoded', decoded.username );
                if(err  || result[0].username !== decoded.username) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                       "UserInfo": {
                            "username": decoded.username
                       }
                    }, 
                        process.env.jwtsecret, {
                        expiresIn: '1d'
                    })
    
                const newRefreshToken = jwt.sign(
                    {
                        "username": result[0].username
                    },
                    process.env.jwtsecret,
                    { expiresIn: '1d'}
                );

                connection.query('UPDATE users SET refreshToken = ? WHERE username = ?', [newRefreshToken, result[0].username])
    
                res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
                console.log('access token', accessToken)
                const username = result[0].username
                res.json({ accessToken, username})
            }
        )
        

    })
   




}

module.exports = { handleRefreshToken }