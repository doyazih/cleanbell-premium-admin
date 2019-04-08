
var qs = require('querystring');

const LoginErrorCode = require('../common/error').LoginErrorCode;

const authController = require('./authController');

var jwt = require('jsonwebtoken');

var SECRET = global.config.auth.secret_key;
var EXPIRES = global.config.auth.token_expire;

exports.index = (req, res, next) => {
    res.render('../view/login/index.ejs');
}

exports.authenticate = (req, res, next) => {
    return authController.authenticate(req, res, next)
    .then(function (user) {
        if (!user)
            return res.redirect('/login?' + qs.stringify({ errorCode: LoginErrorCode.NotExistsUser }));


        if (req.body.isRemember) {
            var token = encodeToken(user.id, EXPIRES);
            res.cookie('remember', true);
            res.cookie('user', { access_token: token }, {
                maxAge: global.config.auth.cookie_expire
            });
        } else {
            var token = encodeToken(user.id, EXPIRES);
            res.clearCookie('remember');
            res.cookie('user', { access_token: token });
        }

        req.logIn(user, function (err) {
            if (err)
                return res.redirect('/login?' + qs.stringify({ errorCode: LoginErrorCode.AuthenticationException }));
            
            const redirectUrl = req.body.redirectUrl || '/';

            return res.redirect(redirectUrl);
        });
    })
    .catch(function (err) {
        if (err && err.code)
            return res.redirect('/login?' + qs.stringify({ errorCode: err.code }));
        else
            return res.redirect('/login?' + qs.stringify({ errorCode: LoginErrorCode.AuthenticationException }));
    })
}

exports.logout = (req, res, next) => {
    res.clearCookie('user');
    return res.redirect('/login');
}

function encodeToken(userId, expire) {
    return jwt.sign({ userId: userId }, SECRET, { expiresIn: expire });
}

function decodeToken(token) {
    return jwt.verify(token, SECRET);
}

exports.decodeToken = function (token) {
    return decodeToken(token);
}