const mysql2 = require('mysql2');


const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'forum',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.getConnection((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('databaza je povezana')
    }
})

module.exports = pool