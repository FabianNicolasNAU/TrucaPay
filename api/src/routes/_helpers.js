const expressBasicAuth = require('express-basic-auth');
const jwt = require('jsonwebtoken');

const basicAuthMiddleware = expressBasicAuth({
    users: {
        'user': process.env['BASIC_AUTH_PASSWORD'] || 'secret'
    }
})

const authToken = (req, res, next) => {
    const authorization = req.headers['authorization'];

    if(!authorization){
        return res.sendStatus(401)
    }

    jwt.verify(authorization, process.env['JWT_SECRET'] || "secret", (err, data) => {
        if(err){
            return res.sendStatus(401)
        }

        req.token = authorization;
        req.authData = data;

        return next();
    })
}


module.exports = {
    basicAuthMiddleware, authToken
}