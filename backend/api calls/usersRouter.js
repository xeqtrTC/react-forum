const pool = require('../Database/connection')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');
const passport = require('../PassportAuthentication/passport');
const nodemailer = require('nodemailer');
const e = require('express');
const userRouter = express.Router();
const format = require('date-fns/format');
const { RedisFunctionFlags } = require('@redis/client/dist/lib/commands/generic-transformers');
const redis = require('redis')

const redisClient = redis.createClient();
// const urltest = {
//     html: `<img src="https://i.ibb.co/DWMwkFC/cover.jpg" object-fit="cover" width="100%" height="300px" /><p style="color: black; margin-top: 20px;">You requested for email verification, kindly use this <a style="background-color: #2AAAF3; padding:10px; text-decoration: none; border-radius: 5px; color:white; font-weight: 500;" href=${url}>click here</a> <p style="text-align: center; color: black; font-weight: 600; margin-top: 20px;">Blackjack OGC 2022</p>`
// }


(async () => {
  
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
  
    await redisClient.connect();
  })();

const sendEmailAccountVerificatedByAdmin = (username, email, url) => {
    const mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.emailID,
            pass: process.env.passwordID
        }
    })

    const mailOptions = {
        from: 'ksektra1312@gmail.com',
        to: email,
        subject: 'Your account is ready for use, Blackjack OGC',
        html: 
        `
        <div style="width: 90%; margin: 0 auto;">
                <img src="https://i.ibb.co/DWMwkFC/cover.jpg" object-fit="cover" width="100%" height="300px" />
                <hr  style="margin-top: 40px"/>
                <p style="text-align: center; color: #666666; font-size: 18px; margin-top: 40px;">Welcome to Blackjack OGC</p>
                <p style="font-size: 12px; color: #9F9F9F; text-align: center; margin-top: 20px;">Your account is ready!</p>    
                <p style="font-size: 12px; color: #9F9F9F; text-align: center; margin-top: 20px;">Hello ${username}, your account is ready, feel free to use it!</p>    
                <p style="text-align: center; margin-top: 25px;"><a style="margin-top: 40px; text-align: center; background-color: #428ECC; padding:10px; font-weight: 600; text-decoration: none; border-radius: 5px; color:white; font-weight: 500;" href=${url}>Take me to Blackjack</a></p>
                <p style="font-size: 12px; color: #B0B0B0; text-align: center; margin-top: 25px">If you did not create an account on Blackjack forum, please ignore this email and no account will be activated or created.</p>    
                <p style="padding: 10px; text-align: center; color: black; ">BLACKJACK OGC 2022</p>
            </div>
        `
    }

    mail.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            return 1
        } else {
            console.log(info);
            return 0
        }
    })
}

const sendEmailVerification = (email, url) => {
    const mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.emailID,
            pass: process.env.passwordID
        }

    })
    
    const mailOptions = {
        from: 'ksektra1312@gmail.com',
        to: email,
        subject: 'Email verification of Blackjack OGC',
        html: 
        `
            <div style="width: 90%; margin: 0 auto;">
                <img src="https://i.ibb.co/DWMwkFC/cover.jpg" object-fit="cover" width="100%" height="300px" />
                <hr  style="margin-top: 40px"/>
                <p style="text-align: center; color: #666666; font-size: 18px; margin-top: 40px;">Welcome to Blackjack OGC</p>
                <p style="font-size: 12px; color: #9F9F9F; text-align: center; margin-top: 20px;">Your account is almost ready</p>    
                <p style="text-align: center; margin-top: 25px;"><a style="margin-top: 40px; text-align: center; background-color: #428ECC; padding:10px; font-weight: 600; text-decoration: none; border-radius: 5px; color:white; font-weight: 500;" href=${url}>Activate your account</a></p>
                <p style="font-size: 12px; color: #B0B0B0; text-align: center; margin-top: 25px">If you did not create an account on Blackjack forum, please ignore this email and no account will be activated or created.</p>    
                <p style="padding: 10px; text-align: center; color: black; ">BLACKJACK OGC 2022</p>
            </div>
        `
    };
    mail.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            return 1
        } else {
            console.log(info);
            return 0
        }
    })
}


const insertIntoOverwatchusers = (req,updatedUsername, section) => {

    const sqlInsert = 'INSERT INTO overwatchusers SET ?';


    try {
        pool.query(sqlInsert, {ow_username: req, ow_updatedusername: updatedUsername, ow_sectionupdated: section, ow_date: new Date()});
    } catch (error) {
        console.log(error);
    }

}


const handleRegisterWithVerification = async (req, res) => {
    const { password, email, username } = req.body

    let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    const mailOptionsInfo = {
        'id': username,
        'created': new Date().toString()
    }
    const token = jwt.sign(mailOptionsInfo, process.env.jwtsecret, { expiresIn: '1d'})
    const url = 'http://localhost:3000/verify/' + token;      

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql1 = 'SELECT username FROM users WHERE username  = ?';
    const sql2 = 'SELECT email FROM users WHERE email = ?';
    const sql3 = 'INSERT INTO users SET ?';
    const sql4 = 'INSERT INTO roles SET ?'

    try {
        pool.query(sql1, [username], (err, rows) => {
            if(rows.length > 0) {
                res.status(401).json({ message: 'Username already in use.'})
            } else {
                pool.query(sql2, [email], (err, result) => {
                    if(result.length > 0) {
                        res.status(401).json({ message: 'Email already in use.'})
                    } else {
                        pool.query(sql3, {username: username, email: email, password: hashedPassword, ipAddress: ipAddress, date: new Date().toISOString()}, (err, result) => {
                            if(result.affectedRows > 0) {
                                pool.query(sql4, {roleusername: username, RegisteredUser: 1}, (err, rows) => {
                                    if(rows) {
                                        sendEmailVerification(email, url);

                                        return res.status(401).json({ message: 'Please check your email and verificate your account'});
                                    } else {
                                        console.log(err);
                                    }
                                })
                                
    
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

const verifyEmail = (req, res) => {

    console.log(req.params.token);

    const sqlInsert = 'INSERT INTO overwatchusers SET ?';


    if(req.params.token) {
        jwt.verify(req.params.token, process.env.jwtsecret, (err, decoded) => {
            if(err) {
                console.log(err);
                res.status(403).json({ message: 'Invalid token, check your email for right one.'});
            } else {
                let id = decoded.id;
                console.log(decoded);

                const sqlUpdate = 'UPDATE users SET isVerificated = 1 WHERE username = ?'
                try {
                    pool.query(sqlUpdate, [id], (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {

                            insertIntoOverwatchusers(req.user.username, username, 'Updated email, by USER')



                           return  res.status(201).json({ success: true});
                        }
                    })
                } catch (error) {

                }
                
            }
        })
    }

}


// REGISTER WITHOUT EMAIL VERIFICATION

// const handleRegister =  async (req, res) => {
//     const { password, username, email } = req.body;
//     console.log(password, username, email)
//     let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    
//     console.log(ipAddress);
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(password, salt)
//     const sql = 'INSERT INTO users SET ?';
//     pool.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
//         if(rows.length > 0) {
//             res.status(401).json({message: 'Username already in use.'})
//         } else {
//             pool.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
//                 if(result.length > 0) {
//                     res.status(401).json({ message: 'Email already in use.'})
//                 } else {
//                     pool.query(sql, {username: username, email: email, password: hashedPassword, ipAddress: ipAddress, date: new Date().toISOString()}, (err, resultInsert) => {
//                         if(resultInsert) {
//                             res.send({ message: 'Works'});
//                             console.log('works');
//                         } else {
//                             console.log(err)
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }




// LOGIN WITH TOKEN, REFRESH TOKEN 

// const handleLogin = async (req, res, done) => {
//     const cookies = req.cookies;
//     console.log(cookies);
//     const { user, password } = req.body;
//     console.log(user, password);
    
//    pool.query('SELECT * from users WHERE username = ?', [user], (err, rows) => {
//     console.log(rows);
//         if(rows.length > 0) {
//             bcrypt.compare(password, rows[0].password, (error, response) => {
//                 if(response) {


                    
//                     const id = rows[0].uid
//                     const accessToken = jwt.sign(
//                         {
//                            "UserInfo": {
//                                 'username': rows[0].username
//                            }
//                         }, 
//                             process.env.jwtsecret, {
//                             expiresIn: '10s'
//                         })
//                     const last_login = rows[0].last_login;
//                     const newRefreshToken = jwt.sign(
//                         {
//                             'username': rows[0].username,
                            
//                         },
//                         process.env.jwtsecret,
//                         { expiresIn: '15s' }
//                     );

//                     let newRefreshTokenArray = !cookies?.jwt ? rows[0].refreshToken : pool.query('UPDATE users SET refreshToken = ? where username = ?', [0, user])
                    
//                     if(cookies?.jwt) {
//                         const refreshToken = cookies.jwt;
//                         const foundToken = rows[0].refreshToken;
                        
//                         if(!foundToken) {
//                             newRefreshTokenArray = []
//                         }
//                         res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})
//                     }

//                     pool.query('UPDATE users SET refreshToken = ? where username = ?', [newRefreshToken, user])



//                     res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })


//                     console.log( {accessToken } )
//                     res.json({ accessToken })
//         } else {
//             res.status(401).json({ 'message': 'Wrong password'})
//         }
//     })
//         } else {
//             res.status(401).json({ 'message': "User doesn't exist"})
//         }
//    })

// }


const handleLoginPassport = (req, res, next) => {
    console.log('usao sam ovde brate')
    passport.authenticate('Forum', (err, user, info) => {
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
                
                const sql = 'INSERT INTO browserhistory SET ?';
                const sql2 = 'INSERT INTO sessiontracks SET ?';
                let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
                try {
                    pool.query(sql,{browser_username: req.user.username, browser_name: req.useragent.browser, browser_osname: req.useragent.os, browser_platform: req.useragent.platform, browser_ipaddress: ipAddress, browser_date: new Date()});
                    pool.query(sql2,{s_sessionID: req.sessionID, s_username: req.user.username, s_date: new Date()});

                } catch ( error) {
                    console.log(error);
                }

                

                res.json({ success: true });
            }
        })
    })(req, res, next);
}


const handleLogoutwithPassport = async (req, res) => {
    req.logout((err) => {
        if(err) {
            console.log(err)
        } else {
            const sql = 'DELETE FROM sessiontracks WHERE s_sessionID = ?';
            const session = req.signedCookies['connect.sid'];
            try {
                pool.query(sql, [session]);
            } catch (error) {
                res.sendStatus(401)
            }
            
            console.log('izlogovan')
            req.session.destroy();
            res.clearCookie('connect.sid');

            res.status(200).json({ message: 'logouted'})
        }
    })
    
   
}



const getUserInfo = (req, res) => {

    const sql1 = 'SELECT * FROM users WHERE uid = ? '
    const sql2 = 'SELECT * FROM browserhistory where browser_username = ?';
    const { username } = req.body;
    console.log(username);

    try { 
        pool.query(sql1, [req.user.uid], (err, result) => {
            if(!err) {
                pool.query(sql2, [req.user.username], (err, rows) => {
                    if(rows) {
                        const resultInfo = result[0]
                        return res.status(200).json({resultInfo, rows})
                    } else {
                        console.log(err)
                    }
                })
            } else {
                console.log(err);
            }
        })
    } catch (error) {

    }
    
    
}

const getUserInfoPublic = (req, res) => {

    const sql1 = 'SELECT * FROM users WHERE username = ?';
    try {
        pool.query(sql1, [req.params.username], (err, result) => {
            if(err) {
                console.log(err);
            } else {
                return res.status(200).json(result);
            }
        })
    } catch (error) {

    }
    
    
}

const updateLocationandSteamtag = (req, res) => {
    const { locationState, steamtagState, username } = req.body;
    console.log(steamtagState);
    const sql = 'UPDATE users SET steamtag = ?, location = ? WHERE username = ?';



    try {
        pool.query(sql, [steamtagState, locationState, req.user.username], (err, result) => {
            if(result) {

                insertIntoOverwatchusers(req.user.username,req.user.username, 'Updated location or steamtag, by USER')




                return res.status(200).json({ success: true })
       
            } else {
                console.log('UNDEFINED', err);
            }
        })
    } catch (error) {

    }
    
}

const updateImage = (req, res) => {
    const { imageName, username } = req.body;

    console.log(imageName)

    const sql = 'UPDATE users SET image = ? WHERE username = ?';
    try {
        pool.query(sql, [imageName, req.user.username], (err, result) => {
            if(result) {
                return res.status(200).json({ success: true })
            } else {
                console.log('ERROR', err);
            }
        })
    } catch ( error) {
        console.log(error);
    }
    
}
// still to do work on this

// done

// user cannot change emails
const updatePasswordorEmail = async (req, res) => {

    const { emailValue, passwordValue, realPasswordValue,  username } = req.body;


    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(passwordValue, salt);

    const sql1 = 'SELECT email FROM users WHERE email  = ?';
    const sql2 = 'UPDATE users SET password = ? WHERE username =  ?';
    const sql3 = 'SELECT password FROM users WHERE username = ? '


    

    try {
        
                
                pool.query(sql3, [req.user.username], (err, rows) => {
                    if(rows) {
                        bcrypt.compare(realPasswordValue, rows[0].password, (error, response) => {
                            if(response) {
    
                                pool.query(sql2, [hashedPassword, req.user.username], (err, result) => {
                                    if(result) {

                                        insertIntoOverwatchusers(req.user.username,req.user.username, 'Updated password, by USER')



                                        return res.status(200).json({ success: true})
                                    } else {
                                        console.log(err);
                                    }
                                })
    
                            } else {
                                return res.status(401).json({message: 'Password is not valid'})
                            }
                        })
                    
                    } else {
                        console.log(err);
                    }
                })
    
    } catch (error) {

    }
     
   
    


}

const stateofUser = (req, res, ) => {
    const sql = 'SELECT username, image, Administrator, RegisteredUser, CommunityManager,Director,HeadAdmin,Admin,VodjaHelpera,Helper, VodjaPromotera,Promoter, org1lider, org2lider,org3lider,org4lider,org5lider, org6lider,org7lider FROM users INNER JOIN roles ON users.username = roles.roleusername WHERE uid = ?'
    
    if(req.user) {

        try {
            pool.query(sql, [req.session.passport.user], (err, result) => {
                if(err) {
                    // next()
                } else {
                    const { 
                        username,
                        image,
                        Administrator,
                        RegisteredUser,
                        CommunityManager,
                        Director,
                        HeadAdmin,
                        Admin,
                        VodjaHelpera,
                        Helper, 
                        VodjaPromotera,
                        Promoter, 
                        org1lider, 
                        org2lider,
                        org3lider,
                        org4lider,
                        org5lider,
                        org6lider,
                        org7lider 
                        } = result[0];
                        const register = 'Registered User'
                        
                    const rolesList = [{
                        "<p className='webDeveloper'>WEB</p>": Administrator,
                        "<p className=''>Community Manager</p>": CommunityManager,
                        "<p className=''>Director</p>": Director,
                        "<p className='registeredRed'>Head Admin</p>": HeadAdmin,
                        Admin,
                        'Vodja Helpera': VodjaHelpera,
                        Helper, 
                        "<p className='registeredRed'>Vodja Promotera</p>": VodjaPromotera,
                        "<p className='registeredRed'>Newbie</p>": RegisteredUser,

                        Promoter, 
                        org1lider, 
                        org2lider,
                        org3lider,
                        org4lider,
                        org5lider,
                        org6lider,
                        org7lider
                }]
        
                    const imageResult = image
                    const roles =  Object.keys(rolesList[0]).filter((item) => rolesList[0][item] > 0)
                    

                    const resultinfo = {
                        roles, username, imageResult
                    }
        
                    return res.status(201).json(resultinfo);
                }
            })
        } catch (error) {

        }
    
} else {
    res.sendStatus(401);
}
    
}











const getUsersList = (req, res) => {

    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1;

    if(canUserAccess) {
        
        const isWeb = req.user.Administrator === 1;
        const isUserCommunityManager = req.user.CommunityManager === 1;
        const isDirector = req.user.Director === 1;
        const isAdmin = req.user.Admin === 1 ;
        
        const sql = 'SELECT uid, username, email, location, steamtag, image, ipaddress, isbanned, isVerificated, postnumber, date, Administrator, HeadAdmin, Admin, Director, CommunityManager FROM users inner join roles where username = roles.roleusername ';
        
        
        
        try {
            pool.query(sql, (err, result) => {
                if(result) {

                    const isWebFilter = () => [
                        
                    ]

                    const resultInfo =  isWeb ? (
                         result
                    ) : (
                        isUserCommunityManager ? (
                            result.filter((item) => !item.Administrator > 0)
                        ) : (
                            isDirector ? (
                                result.filter((item) => !item.Administrator > 0 && !item.CommunityManager > 0)
                            ) : (
                                isAdmin ? (
                                    result.filter((item) => !item.Administrator > 0 && !item.CommunityManager > 0 && !item.Director > 0)
                                ) : (
                                    null
                                )
                            )
                        )
                    )


                    
                            console.log(resultInfo);



                    return res.json(resultInfo)
                } else {
                    console.log(err);
                }
            })
        } catch (error) {

        }
        
    } else {
        res.status(401);
    }
}


const getPostsList = (req, res) => {
    if(req.user.Administrator === 1 ) {
        const sql = 'SELECT * FROM posts'
        try {
            pool.query(sql, (err, result) => {
                if(result ) {
                    return res.json(result)
                } else {
                    console.log(err);
                }
            })
        } catch (error) {

        }
        
    } else {
        res.sendStatus(401);
    }
}


const getUserById = (req, res) => {

    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1;


    if(canUserAccess) {
        const sql = 'SELECT username, image, email,location, steamtag,postnumber,date,ipaddress,isbanned, isVerificatedByAdmin, RegisteredUser, Administrator, CommunityManager,Director,HeadAdmin,Admin,VodjaHelpera,Helper, VodjaPromotera,Promoter, org1lider, org2lider,org3lider,org4lider,org5lider, org6lider,org7lider FROM users INNER JOIN roles ON users.username = roles.roleusername WHERE uid = ?'
        const sql2 = 'SELECT * FROM browserhistory where browser_username = ?'

        const sql3 = 'SELECT username, date, email FROM users WHERE ipaddress = ?';
        
        try {
            pool.query(sql, [req.params.id], (err, result) => {
                if(result.length > 0 ) {
                    
                    const { 
                        username,
                        email,
                        location,
                        steamtag,
                        postnumber,
                        date,
                        isVerificatedByAdmin,
                        ipaddress,
                        isbanned,
                        image,
                        RegisteredUser,
                        Administrator,
                        CommunityManager,
                        Director,
                        HeadAdmin,
                        Admin,
                        VodjaHelpera,
                        Helper, 
                        VodjaPromotera,
                        Promoter, 
                        org1lider, 
                        org2lider,
                        org3lider,
                        org4lider,
                        org5lider,
                        org6lider,
                        org7lider 
                        } = result[0];
                    
                        if(Administrator > 0 && req.user.Administrator === 0) {
                            return res.status(401).json({ message: 'You are not allowed'})
                        } else if (CommunityManager > 0 && req.user.Administrator === 0 && req.user.CommunityManager === 0) {
                            return res.status(401).json({ message: 'You are not allowed'})
                        } else if (Director > 0 && req.user.Administrator === 0 && req.user.CommunityManager === 0 && req.user.Director === 0) {
                            return res.status(401).json({ message: 'You are not allowed'})
                        } else if (HeadAdmin > 0 && req.user.Administrator === 0 && req.user.CommunityManager === 0 && req.user.Director === 0 && req.user.HeadAdmin === 0) {
                            return res.status(401).json({ message: 'You are not allowed'})
                        } else if (Admin > 0 && req.user.Administrator === 0 && req.user.CommunityManager === 0 && req.user.Director === 0 && req.user.HeadAdmin === 0 && req.user.Admin === 0) {
                            return res.status(401).json({ message: 'You are not allowed'})
                        }  else {
                            pool.query(sql2, [result[0].username], (err, rows) => {
                                if(rows) {
                                    pool.query(sql3, [result[0].ipaddress], (err, results) => {
                                        if(results) {
        
                                            const { 
                                                username,
                                                email,
                                                location,
                                                steamtag,
                                                postnumber,
                                                date,
                                                isVerificatedByAdmin,
                                                ipaddress,
                                                isbanned,
                                                image,
                                                RegisteredUser,
                                                Administrator,
                                                CommunityManager,
                                                Director,
                                                HeadAdmin,
                                                Admin,
                                                VodjaHelpera,
                                                Helper, 
                                                VodjaPromotera,
                                                Promoter, 
                                                org1lider, 
                                                org2lider,
                                                org3lider,
                                                org4lider,
                                                org5lider,
                                                org6lider,
                                                org7lider 
                                                } = result[0];
                
                                                const ipAddressHistory = results;
                                                const browserHistoryInfo = rows
                                                const userInfoList= {
                                                    username,
                                                    email,
                                                    location,
                                                    steamtag,
                                                    isVerificatedByAdmin,
                                                    postnumber,
                                                    date,
                                                    ipaddress,
                                                    isbanned,
                                                    image,
                                                }
                                            
                                            // if(Administrator > 0 && req.user.Administrator === 0) {
                                            //     res.status(401).json({ message: 'You are not allowed'})
                                            // }
                
                                            //     const rolesList = [{
                                            //         Administrator,
                                            //         CommunityManager,
                                            //         Director,
                                            //         HeadAdmin,
                                            //         Admin,
                                            //         VodjaHelpera,
                                            //         Helper, 
                                            //         VodjaPromotera,
                                            //         Promoter, 
                                            //         org1lider, 
                                            //         org2lider,
                                            //         org3lider,
                                            //         org4lider,
                                            //         org5lider,
                                            //         org6lider,
                                            //         org7lider,
                                            //         RegisteredUser
                                            // }]
                                            const rolesList = [{
                                                "<p className='web'>WEB</p>": Administrator,
                                                "Community Manager": CommunityManager,
                                                "<p className='registeredRed'>Direktor</p>": Director,
                                                "<p className='registeredRed'>Head Admin</p>": HeadAdmin,
                                                "<p className='registeredRed'>Admin</p>": Admin,
                                                "<p className='registeredRed'>Vodja Helpera</p>": VodjaHelpera,
                                                "<p className='registeredRed'>Helper</p>": Helper, 
                                                "<p className='registeredRed'>Vodja Promotera</p>": VodjaPromotera,
                                                "<p className='registeredRed'>Newbie</p>": RegisteredUser,
                        
                                                Promoter, 
                                                org1lider, 
                                                org2lider,
                                                org3lider,
                                                org4lider,
                                                org5lider,
                                                org6lider,
                                                org7lider
                                        }]
                                        const rolesListForDelete = [{
                                            "Community Manager": CommunityManager,
                                            "Director": Director,
                                            "Head Admin": HeadAdmin,
                                            "Admin": Admin,
                                            "Vodja Helpera": VodjaHelpera,
                                            "Helper": Helper, 
                                            "Vodja Promotera": VodjaPromotera,
                                            "Newbie": RegisteredUser,
                    
                                            Promoter, 
                                            org1lider, 
                                            org2lider,
                                            org3lider,
                                            org4lider,
                                            org5lider,
                                            org6lider,
                                            org7lider
                                    }]
                                        const rolesListWEB = [{
                                            "Community Manager": CommunityManager,
                                            "Director": Director,
                                            "Head Admin": HeadAdmin,
                                            "Admin": Admin,
                                            "Vodja Helpera": VodjaHelpera,
                                            "Helper": Helper, 
                                            "Vodja Promotera": VodjaPromotera,
                                            "Newbie": RegisteredUser,
                    
                                            Promoter, 
                                            org1lider, 
                                            org2lider,
                                            org3lider,
                                            org4lider,
                                            org5lider,
                                            org6lider,
                                            org7lider
                                    }]
        
        
                                        const rolesListofCommunityManager = [{
                                            "Head Admin": HeadAdmin,
                                            Admin,
                                            'Vodja Helpera': VodjaHelpera,
                                            Helper, 
                                            "Vodja Promotera</p>": VodjaPromotera,
                                            "Newbie</p>": RegisteredUser,
                    
                                            Promoter, 
                                            org1lider, 
                                            org2lider,
                                            org3lider,
                                            org4lider,
                                            org5lider,
                                            org6lider,
                                            org7lider
                                        }]
        
                                        const rolesListofHeadAdmin = [{
                                            Admin,
                                            'Vodja Helpera': VodjaHelpera,
                                            Helper, 
                                            "Vodja Promotera": VodjaPromotera,
                                            "Newbie": RegisteredUser,
                    
                                            Promoter, 
                                            org1lider, 
                                            org2lider,
                                            org3lider,
                                            org4lider,
                                            org5lider,
                                            org6lider,
                                            org7lider
                                        }]
        
                                        const rolesListofAdmin = [{
                                            'Vodja Helpera': VodjaHelpera,
                                            Helper, 
                                            "Vodja Promotera": VodjaPromotera,
                                            "Newbie": RegisteredUser,
                    
                                            Promoter, 
                                            org1lider, 
                                            org2lider,
                                            org3lider,
                                            org4lider,
                                            org5lider,
                                            org6lider,
                                            org7lider
                                        }]
        
                                        // const rolesForUpdate = rolesList[0]
        
                                        const isUserAdministrator = req.user.Administrator === 1;
                                        const isUserDirector = req.user.Director === 1;
                                        const isUserCommunityManager = req.user.CommunityManager === 1;
                                        const isUserHeadAdmin = req.user.HeadAdmin === 1;
                                        const isUserAdmin = req.user.Admin === 1;
        
                                
                                            const rolesForUpdate = isUserAdministrator ? (
                                                Object.keys(rolesListWEB[0]).filter((item) => rolesListWEB[0][item] >= 0)
                                            ) : (
                                               isUserDirector || isUserCommunityManager ? (
                                                Object.keys(rolesListofCommunityManager[0]).filter((item) => rolesListofCommunityManager[0][item] >= 0)
                                               ) : (
                                                isUserHeadAdmin ? (
                                                    Object.keys(rolesListofHeadAdmin[0]).filter((item) => rolesListofHeadAdmin[0][item] >= 0)
                                                ) : (
                                                    isUserAdmin && (
                                                        Object.keys(rolesListofAdmin[0]).filter((item) => rolesListofAdmin[0][item] >= 0)
                                                    )
                                                )
                                               )
                                            )
                                            
                                    
                                            const roles =  Object.keys(rolesList[0]).filter((item) => rolesList[0][item] > 0)
                                            // const rolesForUpdateADMIN =  Object.keys(rolesList[0]).filter((item) => rolesList[0][item] >= 0)
                                            // const rolesForUpdateNORMALADMIN =  Object.keys(rolesList[0]).filter((item) => rolesList[0][item] >= 0)
                                            const rolesForDeleteUser = Object.keys(rolesListForDelete[0]).filter((item) => rolesListForDelete[0][item] > 0);
        
                            
                                            const resultInfo = {
                                                roles, userInfoList, browserHistoryInfo, ipAddressHistory, rolesForUpdate, rolesForDeleteUser
                                            }
                            
                                            return res.json(resultInfo)
                    
        
                                        } else {
                                            console.log(err);
                                        }
                                    })
                                   
                                    
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                                } else {
                                    console.log(err);
                                }
                            })        
                        }
                    
                    
                   
                } else {
                    return res.json({ message: "That user doesn't exist"})
                }
            })
        } catch (error) {
            
        }
    } else {
        res.sendStatus(401);
    }
}

const countAdminDashboard = (req, res) => {

    const sql = 'SELECT  (SELECT COUNT(*)FROM   users) AS countUsers,(SELECT COUNT(*)FROM   posts) AS countTopics,(SELECT COUNT(*)FROM categories) as countCategories  FROM    dual';
    const sql2 = 'SELECT username, email, image FROM users ORDER BY uid DESC LIMIT 20'
    const sql3 = 'SELECT postid, postdate, postusername, category, posttitle FROM posts ORDER BY postid DESC LIMIT 20'
    try { 
        pool.query(sql, (err, result) => {
            if(result) {
                pool.query(sql2, (err, rows) => {
                    if(rows) {
                        pool.query(sql3, (err, results) => {
                            if(results) {
                                const countRows = result;
                                const mapUsers = rows
                                const mapTopics = results;


                                const resultInfo = {
                                    countRows,
                                    mapUsers,
                                    mapTopics
                                }
                                res.status(200).json(resultInfo)
                            }
                        })
                       
                    }
                })
            } else {
                console.log(err);
            }
        })
    } catch ( err ) {
        console.log(err);
    }

}










const insertMessage = (req, res) => {
    const sql = 'INSERT INTO messages SET ?';

    const { message } = req.body
    console.log(message);
    try {
        pool.query(sql, {messageuser: req.user.username, messagecontent: message, messageimage: req.user.image, messagedate: new Date()}, (err, rows) => {
            if(rows) {
                return res.json({ success: true });
            } else {
                console.log(err)
            }
        })
    } catch (error) {

    }
    
}


const listOfAccountsToBeApproved = (req, res) => {

    const sql = 'SELECT uid, username, email, ipaddress, date FROM users WHERE isVerificatedByAdmin = 0';

    try { 
        pool.query(sql, (err, rows) => {
            if(rows) {
                return res.status(200).json(rows);

            } else {
                console.log(err);
            }
        })
    } catch (error) {   
        console.log(error);
    }


} 

const verifyUserAccountByAdmin = (req, res) => {

    const { id, username, email } = req.body;

    const url = 'http://localhost:3000';

    

    const sql = 'UPDATE users SET isVerificatedByAdmin = 1 WHERE uid = ?';


    try {
        pool.query(sql, [id], (err, result) => {
            if(result.affectedRows > 0) {
                
                sendEmailAccountVerificatedByAdmin(username, email, url)
                insertIntoOverwatchusers(req.user.username,username, 'Verificated user by Admin')


                return res.status(200).json({ success: true})
            } else {
                return res.status(401).json({ success: false})
            }
        })
    } catch (error) {
        console.log(error);
    }

}




const updateUserAccountByAdmin = async(req, res) => {
    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1;

    if(canUserAccess) {
        const { location, steamtag, password, id } = req.body
        const sql = 'UPDATE users SET location = ?, steamtag = ?, password = ? WHERE uid = ?';
        const sql2 = 'UPDATE users SET location = ?, steamtag = ? WHERE uid = ?';


         


            if(password) {
                const salt = await bcrypt.genSalt(12);
                const hashedPassword = await bcrypt.hash(password, salt); 

                try {

                    pool.query(sql, [location, steamtag, hashedPassword, id], (err, result) => {
                        if(result.affectedRows > 0) {

                            insertIntoOverwatchusers(req.user.username,id, 'Updated user by Admin, password')



                            res.status(200).json({ success: true})
                        } else {
                            console.log(err);
                        }
                    })
        
                } catch (error) {
                    console.log(error);
                }

            } else {
                pool.query(sql2, [location, steamtag, id], (err, result) => {
                    if(result.affectedRows > 0) {

                        insertIntoOverwatchusers(req.user.username,id, 'Updated user by Admin, location OR steamtag')


                        pool.query(sqlInsert, {ow_username: req.user.username, ow_updatedusername: id, ow_sectionupdated: 'Updated user by Admin, location OR steamtag', ow_date: new Date()});


                        res.status(200).json({ success: true})
                    } else {
                        console.log(err);
                    }
                })
                
            }

                   


        
        

    } else {
        res.sendStatus(401);
    }

    

 

}

const updateRoleForUser = (req, res) => {

    const { currentValueForRoles, username } = req.body
    console.log(currentValueForRoles);

    const unSplittedString = currentValueForRoles.replace(/ /g, '')
    console.log(username);
    // korisnik ne moze da updejtuje veci role od svog
    // samo WEB moze da doda direktrao, community managera
    // spreciti ako neko pusti WEB preko injectiona

//     const rolesList = [{
//         Administrator: "<p className='webDeveloper'>WEB</p>",
//         CommunityManager: "<p className=''>Community Manager</p>",
//         Director,
//         HeadAdmin: "<p className='registeredRed'>Head Admin</p>",
//         Admin,
//         VodjaHelpera: 'Vodja Helpera',
//         Helper, 
//         VodjaPromotera:  "<p className='registeredRed'>Vodja Promotera</p>",
//         RegisteredUser: "<p className='registeredRed'>Newbie</p>",

//         Promoter, 
//         org1lider, 
//         org2lider,
//         org3lider,
//         org4lider,
//         org5lider,
//         org6lider,
//         org7lider
// }]


    const includedRolesForUpdating = req.user.Administrator === 1;
    const includedRolesForUpdatingSecond = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1;
    const includedRolesForUpdatingThird = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.HeadAdmin === 1;
    const includedRolesForUpdatingFourth = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.HeadAdmin === 1 || req.user.Admin === 1;
    const includedRolesForUpdatingFive = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.HeadAdmin === 1 || req.user.Admin === 1 || req.user.VodjaHelpera === 1;
    const includedRolesForUpdatingSeven = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.HeadAdmin === 1 || req.user.Admin === 1 || req.user.VodjaPromotera === 1;

    const sqlCheckAdmin = "select if(Admin = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckCommunityManager = "select if(CommunityManager = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckDirector = "select if(Director = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckHeadAdmin = "select if(HeadAdmin = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckVodjaHelpera = "select if(VodjaHelpera = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckHelper= "select if(Helper = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckVodjaPromotera = "select if(VodjaPromotera = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckPromoter = "select if(Promoter = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckNewbie = "select if(RegisteredUser = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    

    const sqlUpdateCommunityManager = 'UPDATE roles SET CommunityManager = 1 WHERE roleusername = ?';
    const sqlUpdateDirector = 'UPDATE roles SET Director = 1 WHERE roleusername = ?';
    const sqlUpdateHeadAdmin = 'UPDATE roles SET HeadAdmin = 1 WHERE roleusername = ?';
    const sqlUpdateAdmin = 'UPDATE roles SET Admin = 1 WHERE roleusername = ?';
    const sqlUpdateVodjaHelpera = 'UPDATE roles SET VodjaHelpera = 1 WHERE roleusername = ?';
    const sqlUpdateHelper = 'UPDATE roles SET Helper = 1 WHERE roleusername = ?';
    const sqlUpdateVodjaPromotera = 'UPDATE roles SET VodjaPromotera = 1 WHERE roleusername = ?';
    const sqlUpdatePromoter = 'UPDATE roles SET promoter = 1 WHERE roleusername = ?';
    const sqlUpdateNewbie = 'UPDATE roles SET RegisteredUser = 1 WHERE roleusername = ?';



    if(unSplittedString === 'CommunityManager') {
        try {
            
            includedRolesForUpdating ? (
                pool.query(sqlCheckCommunityManager, [username], (err, result) => {
                    const [{ resultInfo }] = result

                    if(resultInfo === 'false') {
                        pool.query(sqlUpdateCommunityManager, [username], (err, resultUpdate) => {
                            if(resultUpdate) {
                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Community Manager')



                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                
                res.status(401).json({ message: 'You are not allowed' })
            )

        } catch (error) {
            console.log(error);
            return res.status(401)

        }
        
        
    } else if (unSplittedString === 'Director') {

        try { 
            includedRolesForUpdating ? (
                pool.query(sqlCheckDirector, [username], (err, result) => {
                    const [{ resultInfo }] = result

                    if(resultInfo === 'false') {
                        pool.query(sqlUpdateDirector, [username], (err, resultUpdate) => {
                            if(resultUpdate) {

                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Director')


                                
                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed'})
            )
        } catch (error) {
            console.log(error);
            return res.status(401);
        }


    } else if (unSplittedString === 'HeadAdmin') {

        try {
            includedRolesForUpdatingSecond ? (
                pool.query(sqlCheckHeadAdmin, [username], (err, result) => {
                    const [{ resultInfo }] = result

                    if(resultInfo === 'false') {
                        pool.query(sqlUpdateHeadAdmin, [username], (err, resultUpdate) => {
                            if(resultUpdate) {

                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Head Admin')


                      
                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed '})
            )
        } catch (error) {  
            console.log(error); 
            res.status(401)
        }
    } else if (unSplittedString === 'Admin') {
        

        try {
            includedRolesForUpdatingThird ? (
                pool.query(sqlCheckAdmin, [username], (err, result) => {
                    const [{ resultInfo }] = result
                    if(resultInfo === 'false') {
                        pool.query(sqlUpdateAdmin, [username], (err, resultUpdate) => {
                            if(resultUpdate) {

                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Admin')


                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed'})
            )
        } catch (error) {
            console.log(error);
            res.status(401);
        }

    } else if (unSplittedString === 'VodjaHelpera') {

        try { 
            includedRolesForUpdatingFourth ? (
                pool.query(sqlCheckVodjaHelpera, [username], (err, result) => {
                    const [{ resultInfo }] = result

                    if(resultInfo === 'false') {
                        pool.query(sqlUpdateVodjaHelpera, [username], (err, resultUpdate) => {
                            if(resultUpdate) {

                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Vodja Helpera')

                                
                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed'})
            )
        } catch (error) {
            console.log(error);
            return res.status(401);
        }
        
        console.log('vodjahelpera')
    } else if (unSplittedString === 'Helper') {

        try { 
            includedRolesForUpdatingFive ? (
                pool.query(sqlCheckHelper, [username], (err, result) => {
                    const [{ resultInfo }] = result

                    if(resultInfo === 'false') {
                        pool.query(sqlUpdateHelper, [username], (err, resultUpdate) => {
                            if(resultUpdate) {

                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Helper')

                                
                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed'})
            )
        } catch (error) {
            console.log(error);
            return res.status(401);
        }
        

        console.log('helper')
    } else if (unSplittedString === 'VodjaPromotera') {

        try { 
            includedRolesForUpdatingFourth ? (
                pool.query(sqlCheckVodjaPromotera, [username], (err, result) => {
                    const [{ resultInfo }] = result

                    if(resultInfo === 'false') {
                        pool.query(sqlUpdateVodjaPromotera, [username], (err, resultUpdate) => {
                            if(resultUpdate) {

                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Vodja Promotera')

                                
                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed'})
            )
        } catch (error) {
            console.log(error);
            return res.status(401);
        }

        console.log('promoteri vodja')
    } else if (unSplittedString === 'Promoter' ) {

        try { 
            includedRolesForUpdatingSeven ? (
                pool.query(sqlCheckPromoter, [username], (err, result) => {
                    const [{ resultInfo }] = result

                    if(resultInfo === 'false') {
                        pool.query(sqlUpdatePromoter, [username], (err, resultUpdate) => {
                            if(resultUpdate) {
                                
                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Promotera')



                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed'})
            )
        } catch (error) {
            console.log(error);
            return res.status(401);
        }

    } else if (unSplittedString === 'Newbie') {

        
        try { 
            includedRolesForUpdatingFourth ? (
                pool.query(sqlCheckNewbie, [username], (err, result) => {
                    const [{ resultInfo }] = result

                    if(resultInfo=== 'false') {
                        pool.query(sqlUpdateNewbie, [username], (err, resultUpdate) => {
                            if(resultUpdate) {

                                insertIntoOverwatchusers(req.user.username,username, 'Added role, Newbie')



                                
                                return res.status(200).json({ success: true })

                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: 'That user already got that role!'});
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed'})
            )
        } catch (error) {
            console.log(error);
            return res.status(401);
        }

        // MAYBE
        console.log('registrovan')
    } else {
        res.status(401).json({ message: 'You are not allowed'})

        console.log('ne postoji')
    }



}


const removeRoleForUser = (req, res) => {

    const { currentRoleForDelete, username } = req.body;
    console.log(username);
    const unSplittedString = currentRoleForDelete.replace(/ /g, '')


    const includedRolesForUpdating = req.user.Administrator === 1;
    const includedRolesForUpdatingSecond = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1;
    const includedRolesForUpdatingThird = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.HeadAdmin === 1;
    const includedRolesForUpdatingFourth = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.HeadAdmin === 1 || req.user.Admin === 1;
    const includedRolesForUpdatingFive = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.HeadAdmin === 1 || req.user.Admin === 1 || req.user.VodjaHelpera === 1;
    const includedRolesForUpdatingSeven = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.HeadAdmin === 1 || req.user.Admin === 1 || req.user.VodjaPromotera === 1;

    const sqlCheckAdmin = "select if(Admin = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
    const sqlCheckCommunityManager = "select if(CommunityManager = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
    const sqlCheckDirector = "select if(Director = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
    const sqlCheckHeadAdmin = "select if(HeadAdmin = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
    const sqlCheckVodjaHelpera = "select if(VodjaHelpera = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
    const sqlCheckHelper= "select if(Helper = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
    const sqlCheckVodjaPromotera = "select if(VodjaPromotera = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
    const sqlCheckPromoter = "select if(Promoter = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
    const sqlCheckNewbie = "select if(RegisteredUser = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    

    const sqlUpdateCommunityManager = 'UPDATE roles SET CommunityManager = 0 WHERE roleusername = ?';
    const sqlUpdateDirector = 'UPDATE roles SET Director = 0 WHERE roleusername = ?';
    const sqlUpdateHeadAdmin = 'UPDATE roles SET HeadAdmin = 0 WHERE roleusername = ?';
    const sqlUpdateAdmin = 'UPDATE roles SET Admin = 0 WHERE roleusername = ?';
    const sqlUpdateVodjaHelpera = 'UPDATE roles SET VodjaHelpera = 0 WHERE roleusername = ?';
    const sqlUpdateHelper = 'UPDATE roles SET Helper = 0 WHERE roleusername = ?';
    const sqlUpdateVodjaPromotera = 'UPDATE roles SET VodjaPromotera = 0 WHERE roleusername = ?';
    const sqlUpdatePromoter = 'UPDATE roles SET promoter = 0 WHERE roleusername = ?';
    const sqlUpdateNewbie = 'UPDATE roles SET RegisteredUser = 0 WHERE roleusername = ?';





    if(unSplittedString === 'CommunityManager') {
        
        try {
            includedRolesForUpdating ? (
                    pool.query(sqlUpdateCommunityManager, [username], (err, result) => {
                        if(result.affectedRows > 0) {

                            insertIntoOverwatchusers(req.user.username,username, 'Remove role, Community Manager')



                           return res.status(200).json({ success: true })
                        } else {
                            return res.status(401);
                        }
                    })
                ) : (
                    res.status(401)
                )
        } catch (error) {
            res.sendStatus(401).json({ message: 'You are not allowed!'});
        }
    } else if (unSplittedString === 'Director') {
        

        try {
            includedRolesForUpdating ? (
                pool.query(sqlUpdateDirector, [username], (err, result) => {
                    if(result.affectedRows > 0) {

                        insertIntoOverwatchusers(req.user.username,username, 'Remove role, Director')


                        return res.status(200).json({ success: true })
                    } else {
                        return res.status(401);
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed!'})
            )
        } catch (error) {
            res.sendStatus(401).json({ message: 'You are not allowed!'});

        }
    } else if (unSplittedString === 'HeadAdmin') {

        try {
            includedRolesForUpdatingSecond ? (
                pool.query(sqlUpdateHeadAdmin, [username], (err, result) => {
                    if(result.affectedRows > 0) {

                        insertIntoOverwatchusers(req.user.username,username, 'Remove role, Head Admin')

                        return res.status(200).json({ success: true })
                    } else {
                        return res.status(401);
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed!'})
            )
        } catch (error) {
            res.sendStatus(401).json({ message: 'You are not allowed!'});

        }

    } else if (unSplittedString === 'Admin') {

        try {
            includedRolesForUpdatingThird ? (
                pool.query(sqlUpdateAdmin, [username], (err, result) => {
                    if(result.affectedRows > 0) {

                        insertIntoOverwatchusers(req.user.username,username, 'Remove role, Admin')

                        return res.status(200).json({ success: true })
                    } else {
                        return res.status(401);
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed!'})
            )

        } catch (error) {
            res.sendStatus(401);
        }
    } else if (unSplittedString === 'VodjaHelpera') {
        
        try {

            includedRolesForUpdatingFourth ? (
                pool.query(sqlUpdateVodjaHelpera, [username], (err, result) => {
                    if(result.affectedRows > 0) {

                        insertIntoOverwatchusers(req.user.username,username, 'Remove role, Vodja Helper')

                        return res.status(200).json({ success: true })
                    } else {
                        return res.status(401);
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed to!'})
            )

        } catch (error) {
            res.sendStatus(401);
        }

    } else if (unSplittedString === 'Helper') {
        
        try {
            includedRolesForUpdatingFive ? (
                pool.query(sqlUpdateHelper, [username], (err, result) => {
                    if(result.affectedRows > 0) {

                        insertIntoOverwatchusers(req.user.username,username, 'Remove role, Helper')




                        return res.status(200).json({ success: true })
                    } else {
                        return res.status(401);
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed to!'})
            )
        } catch (error) {
            res.sendStatus(401);
        }

    } else if (unSplittedString === 'VodjaPromotera') {

        try {
            includedRolesForUpdatingFourth ? (
                pool.query(sqlUpdateVodjaPromotera, [username], (err, result) => {
                    if(result.affectedRows > 0) {

                        insertIntoOverwatchusers(req.user.username,username, 'Remove role, Vodja Promotera')



                        return res.status(200).json({ success: true })
                    } else {
                        return res.status(401);
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed!'})
            )
        } catch (error) {
            res.sendStatus(401);
        }

    } else if (unSplittedString === 'Promoter') {
        
        try {
            includedRolesForUpdatingSeven ? (
                pool.query(sqlUpdatePromoter, [username], (err, result) => {
                    if(result.affectedRows > 0) {

                        insertIntoOverwatchusers(req.user.username,username, 'Remove role, Promoter')



                        return res.status(200).json({ success: true })
                    } else {
                        return res.status(401);
                    }
                })
            ) : (
                res.status(401).json({ message: 'You are not allowed!'})
            )

        } catch (error) {
            res.sendStatus(401);
        }

    } else {
        console.log('nema')
        res.status(401).json({ message: 'Role doesnt exist'})
    }











}

const leaderOfHelperQuery = (req, res) => {

    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1 || req.user.VodjaHelpera === 1;


    if(canUserAccess) {

        const sql = 'SELECT uid, username, Helper, Admin, Administrator, HeadAdmin, Director, CommunityManager FROM users INNER JOIN  roles ON username = roles.roleusername WHERE Helper > 0';
        const sql2 = 'SELECT COUNT(*) as resultCount FROM users inner join roles ON users.username = roles.roleusername WHERE roles.Helper > 0';


        pool.query(sql, (err, result) => {
            if(result) {
                pool.query(sql2, (err, resultSecond) => {
                    if(resultSecond) {
                            const countHelper = resultSecond[0]

                            // const testacab = result.filter((item) => !item.Administrator || !item.Admin  || !item.HeadAdmin  || !item.Director || !item.CommunityManager > 0 );
                            const filteredInfo = result.filter((item) => !item.Administrator > 0 && !item.CommunityManager > 0 && !item.Admin > 0 && !item.HeadAdmin > 0 && !item.Director > 0);

                            const filterItems = (item) => {
                                if(item.Administrator > 0) {
                                    return item.Administrator === 0
                                } else if (item.CommunityManager > 0) {
                                    return item.CommunityManager === 0
                                } else if (item.Director > 0) {
                                    return item.Director === 0
                                } else if (item.HeadAdmin > 0) {
                                    return item.HeadAdmin === 0
                                } else if (item.Admin > 0) {
                                    return item.Admin === 0
                                } else {
                                    console.log('itemi', item);
                                }
                            }
                            const teacab = result.filter(filterItems);

                            let iIndex =  result.map((item) => {item.Administrator , item.Admin , item.HeadAdmin , item.Director , item.CommunityManager}).filter((item) => item );
                            console.log(iIndex);

                        const resultInfo = {
                            filteredInfo, countHelper
                        }

                        res.status(200).json(resultInfo);

                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log(err);
                return res.sendStatus(401);
            }
        })





    } else {
        res.sendStatus(401);
    }


}

const addHelperQueryListUsers = (req, res) => {

    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1 || req.user.VodjaHelpera === 1;


    if(canUserAccess) {

        const sql = 'SELECT uid, username, Administrator, Admin, Director, CommunityManager, HeadAdmin, Helper FROM users INNER JOIN roles ON username = roles.roleusername';
        // const sql2 = 'SELECT COUNT(*) as resultCount FROM users inner join roles ON users.username = roles.roleusername WHERE roles.Helper > 0';

        const sqlCheckAdmin = "select if(Admin = 1, 'true', 'false') as resultInfo from roles WHERE roleusername = ?";    
        const sqlCheckCommunityManager = "select if(CommunityManager = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
        const sqlCheckDirector = "select if(Director = 1, 'true', 'false') as result from roles WHERE roleusername = ?";    
        const sqlCheckHeadAdmin = "select if(HeadAdmin = 1, 'true', 'false') as result from roles WHERE roleusername = ?"; 


        pool.query(sql, (err, result) => {
            if(result) {
                

                const filteredResult = result.filter((item) => !item.Administrator > 0 && !item.CommunityManager > 0 && !item.Admin > 0 && !item.HeadAdmin > 0 && !item.Helper > 0 && !item.Director > 0 && !item.Helper > 0);

                return res.status(200).json(filteredResult);


            } else {
                console.log(err);
                return res.sendStatus(401);
            }
        })





    } else {
        res.sendStatus(401);
    }


}

const addHelperUser = (req, res) => {

    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1 || req.user.VodjaHelpera === 1;


    if(canUserAccess) {

        const { selectedUser } = req.body;
        const sql = 'UPDATE roles SET Helper = 1 WHERE roleusername = ?';
       
        const canUserUpdate =  req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1 || req.user.VodjaHelpera === 1;

        try {
            canUserUpdate  ? (
                selectedUser === 'xeqtr' ? (
                    res.status(401).json({ message: 'You are not allowed, xeqtr has been informed'})
                ) : (
                    pool.query(sql, [selectedUser], (err, result) => {
                        if(result.affectedRows > 0) {
                            console.log('prosao');

                            insertIntoOverwatchusers(req.user.username,selectedUser,'Helper added')

                            return res.status(200).json({ success: true})
                        } else {
                            console.log(err);
                            return res.status(401);
                        }
                    } )
                )
            ) : (
                res.status(401).json({ message: failure})
            )
        } catch (error) {
            res.sendStatus(401);
        }



    } else {
        res.sendStatus(401);
    }


}


const getOverWatchPosts = (req, res) => {
    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1;

    if(canUserAccess) {
        const sql = 'SELECT * FROM overwatchposts';
        try {

            pool.query(sql, (err, result) => {
                if(result) {
                    return res.status(200).json(result);
                } else {
                    return res.status(400).json({ message: err});
                }
            })
        
        } catch (error) {
            console.log(error);
        }

    } else {
        res.status(401).json({message: 'Not allowed'})
    }
}

const getOverWatchUsers = (req, res) => {
    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1 

    if(canUserAccess) {
        const sql = 'SELECT * FROM overwatchusers';
        try {

            pool.query(sql, (err, result) => {
                if(result) {
                    return res.status(200).json(result);
                } else {
                    return res.status(400).json({ message: err});
                }
            })
        
        } catch (error) {
            console.log(error);
        }

    } else {
        res.status(401).json({message: 'Not allowed'})
    }
}

const newsList = async(req, res) => {
        const sql = 'SELECT * FROM news';
        const sql2 = 'SELECT b_bandate from banned WHERE b_username = ?';

        console.log('ACAb');

        try {
            const value = await redisClient.get(`newsList`)
            console.log(value);
            if(value) {
                res.status(200).json(JSON.parse(value))
            } else {
                pool.query(sql, async(err, result) => {
                    if(result.length > 0) {
                        // pool.query(sql2, [req.user.username], (err, results) => {
                        //     if(results) {
                        //         console.log(format(new Date(), 'MM/dd/yyyy'));
                        //     }
                        // } )
                        await redisClient.set(`newsList`, JSON.stringify(result))   
                        console.log(result);                       

                        return res.status(200).json(result);
                    } else {
                        console.log(err);
                    }
                })
            
            }
        } catch (error) {
            console.log(error);
        }

        


    }



const insertNews = (req, res) => {
    if(req.user.Administrator > 0) {

        const { valueForQuill, titleOfNews, shortDesc } = req.body;

        const sql = 'INSERT INTO news SET ?';
        const sql2 = 'SELECT * FROM news';

        const testForRedis = {
            n_title: titleOfNews, 
            n_shortdesc: shortDesc,
            n_description: valueForQuill,
             n_username: req.user.username,
              n_date: new Date()
        }

        try {

            pool.query(sql, {n_title: titleOfNews, n_shortdesc: shortDesc,n_description: valueForQuill, n_username: req.user.username, n_date: new Date()}, async(err, result) => {
                if(result.affectedRows > 0) {
                    pool.query(sql2,async (err, resultOfArray) => {
                        if(resultOfArray) {
                            insertIntoOverwatchusers(req.user.username,titleOfNews, 'Added news')

                            await redisClient.set(`newsList`, JSON.stringify(resultOfArray))

                        return res.status(200).json({ success: true})
                        }
                    })
                        
                } else {
                    return res.status(401).json({ message: 'Not allowed'})
                }
            })

        } catch (error) {   
            res.sendStatus(401);
        }



    } else {
        res.sendStatus(401);
    }
}

const deleteNews = (req, res) => {
    if(req.user.Administrator > 0) {
        const { n_id } = req.body;

        const sql = 'DELETE FROM news WHERE n_id = ?';

    

        pool.query(sql, [n_id], async(err, result) => {
            if(result.affectedRows > 0) {

                insertIntoOverwatchusers(req.user.username,n_id, 'Deleted news')
                await redisClient.del(`newsList`)
                return res.status(200).json({ success: true})
            } else {
                console.log(err);
            }
        })


    } else {
        res.sendStatus(401);
    }
}

const getNewsByTitle = (req, res) => {

    const sql = 'SELECT * FROM news WHERE n_title = ?'

    try {
        pool.query(sql, [req.params.n_title], (err, result) => {
            if(result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json({ message: "News under that name doesn't exist"})
            }
        })
        
    } catch (error) {

    }

}

const banUserFunction = (req, res) => {
    const canAccess = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1
    if(canAccess) {

        const { fullDateNumber, username, banReason }  = req.body;
        console.log('date', fullDateNumber);
        const sql = 'INSERT INTO banned SET ?';
        const sql2 = 'UPDATE users SET  isbanned = 1 WHERE username = ?';
        const sql3 = 'INSERT INTO bannedhistory SET ?';
        const sql4 = 'SELECT s_sessionID from sessiontracks WHERE s_username = ?';
        const sql5 = 'DELETE FROM sessions WHERE session_id = ?';
        const sql6 = 'DELETE FROM sessiontracks WHERE s_username = ?';

        try {

            pool.query(sql, {b_whobanned: req.user.username, b_whoisbanned: username, b_bandate: fullDateNumber, b_reason: banReason, b_date: new Date()}, (err, result) => {
                if(result.affectedRows > 0) {
                    pool.query(sql2, [username], (err, rows) => {
                        if(rows) {
                            pool.query(sql4, [username], (err, resultOfSelection) => {
                                if(resultOfSelection.length > 0) {
                                    pool.query(sql5, [resultOfSelection[0].s_sessionID], (err, resultOfDelete) => {
                                        if(resultOfDelete.affectedRows > 0) {
                                            pool.query(sql6, [username], (err, resultOfDeleteSession) => {
                                                if(resultOfDeleteSession.length > 0) {

                                                    insertIntoOverwatchusers(req.user.username,username, 'Banned user')
                                                    return res.status(200).json({ success: true })

                                                } else {
                                                    insertIntoOverwatchusers(req.user.username,username, 'Banned user')

                                                    return res.status(200).json({ success: true })

                                                }
                                            })

                                            
                                        } else {

                                            insertIntoOverwatchusers(req.user.username,username, 'Banned user')
                                            return res.status(200).json({ message: 'You banned user, user was not logged.' })
                                        
                                        }
                                    })
                                } else {
                                    insertIntoOverwatchusers(req.user.username,username, 'Banned user')



                                    return res.status(200).json({ success: true })
                                }
                            })


                           
                        } else {
                            console.log(err);
                            return res.status(401).json({ message: 'Something went wrong'})
                        }
                    })

                } else {
                    return res.status(200).json({ message: 'Something went wrong'})
                }
            })

        } catch (error) {
            console.log(error);
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
   
}

const unbanUserFunction = (req, res) => {
    const canAccess = req.user.Administrator === 1 || req.user.Director === 1 || req.user.CommunityManager === 1

    if(canAccess) {

        const { username } = req.body
    
            const sql = 'UPDATE users SET isbanned = 0 WHERE username = ?';
            const sql2 = 'DELETE FROM banned WHERE b_whoisbanned = ?';
            const sql3 = 'INSERT INTO bannedhistory SET ?';
            const sql4 = 'SELECT * FROM banned WHERE b_whoisbanned = ?';

        try {
            pool.query(sql, [username], (err, result) => {
                if(result.affectedRows > 0) {
                    pool.query(sql4, [username], (err, resultOfSelect) => {
                        console.log(resultOfSelect);
                        if(resultOfSelect) {
                            pool.query(sql3, {bh_whoisbanned: username,bh_whobanned: resultOfSelect[0].b_whobanned, bh_whounbanned: req.user.username, bh_reasonbanned: resultOfSelect[0].b_reason,bh_banduration:resultOfSelect[0].b_bandate, bh_dateofban: resultOfSelect[0].b_date, bh_dateofunban: new Date(), bh_dateofstoring: new Date(), }, (err, resultOfInsert) => {
                                if(resultOfInsert.affectedRows > 0) {
                                    pool.query(sql2, [username], (err, rows) => {
                                        if(rows) {
                
                
    
                                            insertIntoOverwatchusers(req.user.username,username, 'Unbanned user')
                
                
                                            return res.status(200).json({ success: true})
                                        } else {
                                            console.log(err);
                                        }
                                    })

                                } else {
                                    console.log(err);
                                }
                            });

                           

                        } else {
                            console.log(err);
                        }
                    })
                    
                    
                }
            })
        } catch (error) {
            console.log(error);
        }



    } else {
        res.sendStatus(401);
    }
}

const getBannedUsersList = (req, res) => {

    const sql = 'SELECT * FROM banned';
    try {
        pool.query(sql, (err, result) => {
            if(result) {
                return res.status(200).json(result)
            } else {
                console.log(err);
            }
        })

    } catch (error) {
        console.log(error);
    }
    
} 

const getBannedHistoryList = (req, res) => {
    const sql = 'SELECT * FROM bannedhistory';

    try {
        pool.query(sql, (err, result) => {
            if(result) {
                return res.status(200).json(result);
            } else {
                console.log(err);
            }
        })

    } catch (error) {

    }
}


const whoCurrentlyGotSession = (req, res) => {
    const sql = 'SELECT * FROM sessiontracks'
    try {
        pool.query(sql, (err, result) => {
            if(result) {
                res.status(200).json(result);
            } 
        })
    } catch (error) {
        console.log(error);
    }
}

// const getUserInfoPublic = (req, res) => {

//     const { username } = req.body;
//     console.log(username);
//     pool.query('SELECT * FROM users WHERE username = ? ', [req.params.username], (err, result) => {
//         console.log(result);
//         if(!err) {
//             res.json({ result })
//         } else {
//             console.log(err);
//         }
//     })
    
// }



module.exports = {
    // handleRegister,
    // handleLogin,
    getUserInfo,
    handleLoginPassport, 
    updateLocationandSteamtag,
    updateImage,
    updatePasswordorEmail,
    handleRegisterWithVerification,
    verifyEmail,
    stateofUser,
    getUserInfoPublic,
    handleLogoutwithPassport,
    getUsersList,
    getPostsList,
    getUserById,
    insertMessage,
    countAdminDashboard,
    listOfAccountsToBeApproved,
    verifyUserAccountByAdmin,
    updateUserAccountByAdmin,
    updateRoleForUser,
    removeRoleForUser,
    leaderOfHelperQuery,
    addHelperQueryListUsers,
    addHelperUser,
    getOverWatchPosts,
    getOverWatchUsers,
    insertNews,
    newsList,
    deleteNews,
    getNewsByTitle,
    banUserFunction,
    unbanUserFunction,
    getBannedUsersList,
    getBannedHistoryList,
    whoCurrentlyGotSession
    
}