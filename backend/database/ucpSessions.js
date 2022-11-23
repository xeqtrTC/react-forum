const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dotenv = require('dotenv')



const options = {
    host: 'localhost',
    user: 'root',
    database: 'ucp',
    password: '',
  };
  
const sessionStoreUCP = new MySQLStore(options);




module.exports = sessionStoreUCP