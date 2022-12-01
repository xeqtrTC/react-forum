const ucpPool = require('../../Database/ucpConnection');
const bcrypt = require('bcryptjs');
const passport = require('./UcpPassport/ucppassport')
const pool = require('../../Database/connection');
const { el } = require('date-fns/locale');


const redis = require('redis')

const redisClient = redis.createClient();

const DEFAULT_EXPIRATION = 3600;

(async () => {
  
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
  
    await redisClient.connect();
  })();
  


const NumberofPostPerUserFunctionServerBot = (req, res) => {
    
    try {

        
        const sql1 = 'SELECT postnumber FROM users WHERE uid  = ?';
        const sqlUpdatePostNumber = 'UPDATE users SET postnumber = ? WHERE uid = ?';

        pool.query(sql1, [90], (err, resultOfCheck) => {
            console.log(resultOfCheck);
            if(resultOfCheck) {
                const number_post = parseInt(resultOfCheck[0].postnumber);
                const update_post = number_post + 1;

                pool.query(sqlUpdatePostNumber, [update_post, 90]);

            }
        })


                
        


                    
    } catch (error) {
        console.log(error);
    }
}

const registerUCPuser = async (req, res) => {
    console.log('usao');
    const { registerStates } = req.body;
    const { characterName, password, confirmPassword, emailAddress, referral } = registerStates
    console.log('aaaaaaaaaaaaaaaaa')
    const sql1 = 'INSERT INTO ucp_users SET ?';
    const sql2 = 'SELECT ucp_username FROM ucp_users WHERE ucp_username = ?';
    const sql3 = 'SELECT ucp_email FROM ucp_users WHERE ucp_email = ?';

    
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);


    try {
        ucpPool.query(sql2, [characterName], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {
                return res.status(409).json({ message: 'That character name is taken!'})
            } else {
                ucpPool.query(sql3, [emailAddress], (err, resultOfSecondcheck) => {
                    if(resultOfSecondcheck.length > 0) {
                        return res.status(409).json({ message: 'That email is taken!'})
                    } else {
                        ucpPool.query(sql1, {ucp_username: characterName, ucp_email: emailAddress, ucp_password: hashedPassword, ucp_ipaddress: req.ip}, (err, resultOfInsert) => {
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
    passport.authenticate('UCP', (err, user, info) => {
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
        ucpPool.query(sql, [req.user.ucp_username], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {
                return res.status(200).json(resultOfCheck[0])
            } else {
                return res.status(401);
            }
        })
    } catch (error) {

    }
}

const reportPlayer = (req, res) => {
    const { yourName, dateOfIncident, timeOfIncident, reportedPlayer, reasonOfReport, describe } = req.body;

    console.log('aaaaaaaaaaa', reasonOfReport);
    const sql = 'INSERT INTO posts SET ?';
    const sql2 = 'INSERT INTO replies SET ?';
    const sql3 = 'SELECT * FROM subcategories WHERE subtitle = ?';
    const sql4 = 'SELECT * FROM posts WHERE idsubcategory = ?'

    const usernameOfServerBot = 'ServerBot';
    const category = 'Zalbe'
    const titleOfReport  = `${yourName} reporting ${reportedPlayer}`;
    const describeTest = `<span><br></span><span><strong style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">Player Name:</strong></span><br/><span><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${yourName}</span></span><span><br></span><span><strong style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">Reported player:</strong></span><br /><span><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${timeOfIncident}</span></span><span><br></span><span><strong style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">Reported player:</strong></span><br /><span><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${reportedPlayer}</span></span><span><br></span><span><strong style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">Reason:</strong></span><br /><span><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${reasonOfReport}</span></span><span><br></span><span><strong style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">What happened:</strong></span><br /><span><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${describe}</span></span><span><br></span><span><strong style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">Screenshots:</strong></span><br />`
    const secondDescribe = `<p></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);">Player Name:</strong></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${yourName}</span></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);">Reported player:</strong></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);">${reportedPlayer}</span></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);">Date &amp; Time:</strong></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${timeOfIncident}</span></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);">Reason:</strong></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${reasonOfReport}</span></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);">What happened:</strong></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">${describe}</span></p><p><strong style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">Screenshots:</strong></p>`
    const urlToBeNavigated = `${category}/${titleOfReport}`
    console.log(urlToBeNavigated);
    // try {
    //     pool.query(sql3, [reasonOfReport], (err, result) => {
    //         if(result) {
    //             console.log('aaa', result);
    //         } else {
    //             console.log(err)
    //         }
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
    // redisClient.get(`/getPostsPerSubCategory/${paramsOfSubCategory}
    try {
        pool.query(sql3, [reasonOfReport], (err, resultOfFirstCheck) => {
            console.log('ovo ', resultOfFirstCheck)
            if(resultOfFirstCheck) {
                pool.query(sql, {postusername: usernameOfServerBot, category: category, idsubcategory: resultOfFirstCheck[0].subid, posttitle: titleOfReport, postdate: new Date()}, (err, resultOfFirstInsert) => {
                    if(resultOfFirstInsert) {
                        pool.query(sql2, {reply_username: usernameOfServerBot, reply_category: category, reply_content: secondDescribe, reply_post: titleOfReport, reply_date: new Date()}, (err, resultOfSecondInsert) => {
                            if(resultOfSecondInsert) {
                                pool.query(sql4, [resultOfFirstCheck[0].subid], async(err, resultOfArray) => {
                                    if(resultOfArray) {
                                        console.log(resultOfArray);
                                        console.log('mozda')
                                        NumberofPostPerUserFunctionServerBot()
                                        console.log('mozdadva')
                                       await redisClient.set(`/getPostsPerSubCategory/${reasonOfReport}`, JSON.stringify(resultOfArray))


                                        return res.status(200).json({ mesage: urlToBeNavigated })

                                    }
                                })

                                
                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err)
                    }
                })
            } else {
                console.log(err);
            }
        })
    } catch (error ){

    }
    


}

module.exports = {
    registerUCPuser,
    UCPhandleLoginPassport,
    infoAboutUser,
    reportPlayer
}