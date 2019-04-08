
const Users = global.dbmodels.Users;

eval(require('fs').readFileSync('./public/js/types.js').toString());

const Q = require('q');

exports.createUser = (req, res, next) => {

    return Q(true);
}

exports.getUser = (req, res, next) => {

    return Users.findOne({
        where: {
            id: req.query.id
        }
    })
    .then(function (user) {
        
        delete user.dataValues.passwordHash;

        return user;
    });
}