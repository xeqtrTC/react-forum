const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headersAuthorization;

    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)

    jwt.verify(token, process.env.jwtsecret, (err, decoded) => {
        if(err) return res.sendStatus(403); // invalid token
        req.user = decoded.UserInfo.username;
        // req.roles = decoded.UserInfo.roles;
        next();
    })

    
}

module.exports = verifyJWT
