const pool = require('../Database/connection')



const searchPostsPerUser = (req, res) => {

    // client side pagination for posts of user, in a future this needs to be server side pagination
    // for now ill leave it like this, probably gonna update it later  - xeqtr
    // https://redux-toolkit.js.org/rtk-query/usage/pagination
    // for mysql pagination = LIMIT(number) ? OFFSET(number) ? 

    const {username} = req.body


    const sql1 = 'SELECT username FROM users WHERE uid = ?';
    const sql2 = 'SELECT * FROM replies WHERE reply_username = ?';
    try {
        pool.query(sql1, [req.session.passport.user], (err, result) => {
            if(result) {
                pool.query(sql2, [result[0].username], (err, rows) => {
                    if(rows) {
                        return res.json(rows)
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log(err);
            }
        } )
    } catch (error) {

    }
    


   
}

const publicSearchPostsPerUser = (req, res) => {

    const sql1 = 'SELECT * FROM replies WHERE reply_username = ?';
    try {
        pool.query(sql1, [req.params.username], (err, result) => {
            if(err) {
                console.log(err)
            } else {
               return res.json(result);
            }
        })
    } catch (error) {

    }
    



}


module.exports = { 
    searchPostsPerUser,
    publicSearchPostsPerUser


}