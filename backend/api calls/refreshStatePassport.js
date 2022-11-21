const pool = require('../database/connection');



const refreshStateofUserPassport = (req, res) => {
    const session = req.session;

    const sql = 'SELECT * FROM users WHERE uid  = ? ';
    console.log('ulazim')
    if(session) {
        try {
            pool.query(sql, [session.passport.user], (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    return res.status(201).json(result[0]);
                }
            })
        } catch (err) {

        }
        
    }
}

module.exports = {
    refreshStateofUserPassport
}