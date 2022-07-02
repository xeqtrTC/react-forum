const mysql2 = require('mysql2');


const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'forum',
    password: '',
    multipleStatements: true,
})

connection.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('databaza je povezana')
    }
})

module.exports = connection