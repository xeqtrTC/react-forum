
const localStrategy = require('passport-local').Strategy;
const passport = require('passport').Passport;
const forumPassport = new passport();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session =  require('express-session');
const pool = require('../Database/connection');
const bcrypt = require('bcryptjs');
const format = require('date-fns/format')
const parseISO = require('date-fns/parseISO')
const redis = require('redis');

const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = redis.createClient({
  enable_offline_queue: false,
});

redisClient.on('error', err => {
    console.log(err);
    // this error is handled by an error handling function that will be explained later in this tutorial
    return new Error();
  });

const maxWrongAttemptsByIPperDay = 100;
const maxConsecutiveFailsByUsernameAndIP = 10;

const limiterSlowBruteByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_ip_per_day',
    points: maxWrongAttemptsByIPperDay,
    duration: 60 * 60 * 24,
    blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
  });


const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_consecutive_username_and_ip',
    points: maxConsecutiveFailsByUsernameAndIP,
    duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
    blockDuration: 60 * 60, // Block for 1 hour
  });
  
  

  const getUsernameIPkey = (username, ip) => `${username}_${ip}`;


  forumPassport.use('Forum', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true

},  async(req,username, password, done) => {
    console.log('user', username)
    console.log('password', password);
    console.log('done', done);
    console.log('......passport js.......');
    
    const sql2 = 'SELECT b_bandate from banned WHERE b_whoisbanned = ?';
    
    const sql3 = 'UPDATE users SET isbanned = 0 WHERE username = ?';
    
    const sql4 = 'DELETE FROM banned WHERE b_username = ?';

    const sqlInsert = 'INSERT INTO overwatchusers SET ?';

    // const ip = req.ip;
    // const usernameIPkey = getUsernameIPkey(username, ip);
    // console.log('ip', usernameIPkey)
    // console.log('ipkey', limiterConsecutiveFailsByUsernameAndIP)

    // const [resUsernameAndIP, resSlowByIP] = await Promise.all([
    //     limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
    //     limiterSlowBruteByIP.get(ip),
    // ]);
    
    // console.log('resUsernameAndIP', resUsernameAndIP)
    // console.log('resSlowByIP', resSlowByIP)

    // let retrySecs = 0;

    // console.log('RETRY SECS', retrySecs)

    // // Check if IP or Username + IP is already blocked;
    // if(resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
    //     retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;

    // } else if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP) {
    //     retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
    // }

    // if(retrySecs > 0) {
    //     return done(null, false, { message: 'Too many requests'})
    // } else {
        try {

            // const promises = [limiterSlowBruteByIP.consume(ipAddr)];

            pool.query('SELECT * FROM users INNER JOIN roles ON users.username = roles.roleusername WHERE username = ? ', [username], async (err, result) => {
                if(result.length > 0) {                    
                    if(result[0].isVerificated === 0) {
                        return done(null, false, {message: 'Account is not verificated'})
                    } else if(result[0].isVerificatedByAdmin === 0) {
                        return done(null, false, { message: 'Your account needs to be approved by admins'})
                       
                    } else if (result[0].isbanned === 1) {
                        pool.query(sql2, [username], (err, results) => {
                            console.log(results);
                            if(results.length > 0) {
                                if(results[0].b_bandate === format(new Date(), 'MM/dd/yyyy')) {
                                    pool.query(sql3, [username], (err, resultOfUnbanned) => {
                                        if(resultOfUnbanned.affectedRows > 0) {
                                            pool.query(sql4, [username], (err, resultDeleted) => {
                                                if(resultDeleted.affectedRows > 0) {
                                                    pool.query(sqlInsert, {ow_username: username, ow_updatedusername: username, ow_sectionupdated: 'User has been auto-unbanned', ow_date: new Date()});
                                                    return done(null, false, { message: 'You were banned, you are unbanned, please login again.'})
                                                }
                                            })
                                        } else {
                                            console.log(err);
                                        }
                                    })
                                }  else {

                                    return done(null, false, { message: `You are banned, you will be on unbanned ${results[0].b_bandate}`})
                                }
                                
                            } else {
                                console.log(err);
                            }
                        })
    
                    }else {
                        bcrypt.compare(password, result[0].password, async (err, response) => {
                            if(response) {
                                console.log('usao')
                                // if(resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
                                //     await limiterConsecutiveFailsByUsernameAndIP.delete(usernameIPkey);
                                // }
                                // pool.query(sql2, [username], (err, results) => {
                                //     if(results) {
                                //         console.log('acaaaaaaaab', results);
                                //         console.log(results[0].b_date === new Date());
                                //     } else {
                                //         console.log(err);
                                //     }
                                // })
                                return done(null, result[0])
                            } else {
                                console.log('ne')

                                return done(null, false, { message: 'Wrong username or password'})
                            }
                        })
                    }
                    
                } else {
                    console.log('neaaa')

                    return done(null, false, { message: "Wrong username or password"})
                }
            })
        } catch (rlRejected) {
            if(rlRejected instanceof Error) {
                throw rlRejected
            } else {
                return done(null, false, { message: 'Try again later'})
            }
        }

    // }



    
    
        
    }))

    
    forumPassport.serializeUser((user, done) => {
    done(null, user.uid)
})

forumPassport.deserializeUser((id, done) => {
    try {
        pool.query('SELECT * FROM users INNER JOIN roles ON users.username = roles.roleusername WHERE uid = ?', [id], (err, rows) => {
            return done(err, rows[0])
        })
    } catch ( error ){
console.log(error);
    }
    
})

module.exports = forumPassport;