const connection = require('../database/connection')



const searchPostsPerUser = (req, res) => {
    const {username} = req.body
    connection.query('SELECT * FROM replies WHERE reply_username = ?', [req.params.username], (err, result) => {
        if(result) {
            res.json(result);

        } else {
            console.log(err);
        }
    } )
}

module.exports = { 
    searchPostsPerUser
}