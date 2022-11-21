const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

const verifySession = (req, res, next) => {
    const authHeader = req.session;
    console.log(authHeader);

    const verifySessionID = (authHeader) => {
        
        try {
            if(authHeader) {
                next();
            }
        } catch (error) {
            console.log(error)
        }
    }
        
    verifySessionID(authHeader);
    
}

module.exports = verifySession
