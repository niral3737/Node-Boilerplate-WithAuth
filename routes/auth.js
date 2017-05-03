const express = require('express');
const _ = require('lodash');
const router = express.Router();

const Response = require('../utils/Response');
const User = require('../model/user');
const validateUser = require('../middleware/validateUser');
const authenticate = require('../middleware/authenticate');

router.post('/register', validateUser, function (req, res) {
    let body = _.pick(req.body, ['email', 'password']);

    let user = new User(body);
    let response = new Response(null, []);  
    
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        response.payload = user;
        res.header('x-auth', token).send(response);
    }).catch((err) => {
        if (err.message.indexOf('email') !== -1) {
            response.error.push('There is already an accout with this email');
            res.status(400).send(response);
            return;
        }
        response.error.push('Something went wrong');
        res.status(400).send(response);
    });
});

router.get('/me', authenticate, (req, res) => {
    let response = new Response(req.user, []);
    res.send(response);
});

router.post('/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            let data = {
                token,
                user
            };
            let response = new Response(data, []);
            res.header('x-auth', token).send(response);
        });
    }).catch((err) => {
        let response = new Response(null, [err.message]);
        res.status(400).send(response);
    });
});

router.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((err) => {
        let response = new Response(null, [err.message]);
        res.status(400).send(response);
    });
});

module.exports = router;