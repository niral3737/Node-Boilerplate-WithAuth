const _ = require('lodash');
const Response = require('../utils/Response');

let validateUser = (req, res, next) => {
    let body = _.pick(req.body, ['email', 'password', 'confirmPassword']);
    let response = new Response(null, []);
    if (body.password !== body.confirmPassword) {
        response.error.push('Passwords doesn\'t match.');
    }
    
    if (!isValidEmail(body.email)) {
        response.error.push('Please enter valid email.');
    }

    if (!isValidPassword(body.password)) {
        response.error.push('Password must be 8 characters long.');
    }

    if (_.isEmpty(response.error)) {
        next();
    } else {
        res.status(401).send(response);
        return;
    }
};

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isValidPassword(password) {
    if (password.length >= 8) return true;
    return false;
}


module.exports = validateUser;