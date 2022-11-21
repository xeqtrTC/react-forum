const pool = require('../../Database/connection')
const bcrypt = require('bcryptjs');
const passport = require('./UcpPassport/ucppassport')


const registerUCPuser = async (req, res) => {

    const { registerStates } = req.body;
    const { characterName, password, confirmPassword, emailAddress, referral } = registerStates

    const sql1 = 'INSERT INTO ucp_users SET ?';
    const sql2 = 'SELECT ucp_username FROM ucp_users WHERE ucp_username = ?';
    const sql3 = 'SELECT ucp_email FROM ucp_users WHERE ucp_email = ?';

    
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);


    try {
        pool.query(sql2, [characterName], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {
                return res.status(409).json({ message: 'That character name is taken!'})
            } else {
                pool.query(sql3, [emailAddress], (err, resultOfSecondcheck) => {
                    if(resultOfSecondcheck.length > 0) {
                        return res.status(409).json({ message: 'That email is taken!'})
                    } else {
                        pool.query(sql1, {ucp_username: characterName, ucp_email: emailAddress, ucp_password: hashedPassword, ucp_ipaddress: req.ip}, (err, resultOfInsert) => {
                            if(resultOfInsert.affectedRows > 0) {
                                return res.status(200).json({ success: true})
                            } else {
                                console.log(err);
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {

    }
}


const UCPhandleLoginPassport = (req, res, next) => {
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
                
                // const sql = 'INSERT INTO browserhistory SET ?';
                // const sql2 = 'INSERT INTO sessiontracks SET ?';
                // let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
                // try {
                //     pool.query(sql,{browser_username: req.user.username, browser_name: req.useragent.browser, browser_osname: req.useragent.os, browser_platform: req.useragent.platform, browser_ipaddress: ipAddress, browser_date: new Date()});
                //     pool.query(sql2,{s_sessionID: req.sessionID, s_username: req.user.username, s_date: new Date()});

                // } catch ( error) {
                //     console.log(error);
                // }

                

                res.json({ success: true });
            }
        })
    })(req, res, next);
}

const infoAboutUser = (req, res) => {
    console.log(req.user);
    const sql = 'SELECT * FROM ucp_users WHERE ucp_username = ?';
    try {
        pool.query(sql, [req.user.ucp_username], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {
                return res.status(200).json(resultOfCheck)
            } else {
                return res.status(401);
            }
        })
    } catch (error) {

    }
}


module.exports = {
    registerUCPuser,
    UCPhandleLoginPassport,
    infoAboutUser
}