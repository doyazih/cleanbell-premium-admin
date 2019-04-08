
const Users = global.dbmodels.Users;

const Q = require('q');

const config = require('config');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const encryptor = require('../util/encryptor');

passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, userId, password, done) {
        Users.findOne({ where: { id: userId } }).then(userData => {
            var user = userData && userData.dataValues ? userData.dataValues : null;

            if (user == null) {
                done(new BizError('NotExistsUser', SigninErrorCode.NotExistsUser), null);
                return;
            }

            if (user.passwordHash != encodePassword(password)) {
                done(new BizError('NotMatchedPassword', SigninErrorCode.NotMatchedPassword), null);
                return;
            }

            done(null, user);
        })
        .catch(function (err) {
            done(err);
        });
    }
));

passport.serializeUser(function (user, done) {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('deserializeUser');
    done(null, user);
});

exports.authenticate = function (req, res, next) {

    return Q.Promise(function (resolve, reject) {
        passport.authenticate('local', function (err, user, info) {

            if (err) {
                reject(err);
            }
            
            resolve(user);

        })(req, res, next);
    });
};

exports.isAuthenticated = function (userId) {
    return Users
    .findOne({ where: { id: userId } })
    .then(userData => {
        var user = userData && userData.dataValues ? userData.dataValues : null;

        if (user == null) {
            throw new Error('User is not exists');
        }

        return user;
    })
}

exports.initialize = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
}

function encodePassword(passwd) {
    return encryptor.encode(passwd);
}