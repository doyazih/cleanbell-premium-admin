eval(require('fs').readFileSync('./public/js/types.js').toString());

const Q = require('q');

exports.createUser = (req, res, next) => {

    return Q(true);
}

exports.getUser = (req, res, next) => {

    let user = {
        seq: 0,
        id: 'tofufather',
        name: '권혁준',
        authority: AuthorityTypes.Administrator
    }

    return Q(user);
}