const mysql2 = require('mysql2');


const ucpPool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ucp',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

ucpPool.getConnection((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('UCP baza radi')
    }
})

module.exports = ucpPool