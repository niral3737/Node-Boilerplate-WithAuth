const User = require('./../model/user');
const Response = require('../utils/Response');

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    let response = new Response(null, []);
    User.findByToken(token).then((user) => {
        if (!user) {
            response.error.push('Email and Password are incorrect');
            res.status(401).send(response);
            return;
        } else {
            req.user = user;
            req.token = token;
            next();
        }    
    }).catch((err) => {
        res.status(401).send();       
    });
};

module.exports = authenticate;