
const localStrategy = require('passport-local').Strategy;
const Passport = require('passport').Passport;
const passportUCP = new Passport();
const express = require('express');
const app = express();
const ucpPool = require('../../../Database/ucpConnection');
const bcrypt = require('bcryptjs');






passportUCP.use('UCP', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true

},  async(req,username, password, done) => {
    console.log('userUCP', username)
    console.log('passwordUCP', password);
    console.log('done', done);
    console.log('......passportUCP js.......');
    
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

    // } else if (resUsernameAndIP !== null && resUsernameAndIPucpPool.consumedPoints > maxConsecutiveFailsByUsernameAndIP) {
    //     retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
    // }

    // if(retrySecs > 0) {
    //     return done(null, false, { message: 'Too many requests'})
    // } else {
        try {

            // const promises = [limiterSlowBruteByIP.consume(ipAddr)];

            ucpPool.query('SELECT * FROM ucp_users WHERE ucp_username = ? ', [username], async (err, result) => {
                
                if(result.length > 0) {
                        bcrypt.compare(password, result[0].ucp_password, async (err, response) => {
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
                    } else {
                        return done( null, false, { message: 'Wrong username or password'})
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

    
passportUCP.serializeUser((user, done) => {
    done(null, user.ucp_uid)
})

passportUCP.deserializeUser((id, done) => {
    console.log(id);
    try {
        ucpPool.query('SELECT * FROM ucp_users WHERE ucp_uid = ?', [id], (err, rows) => {
           return done(err, rows[0])
        })
    } catch ( error ){
        console.log('error', error)
    }
    
})

module.exports = passportUCP;