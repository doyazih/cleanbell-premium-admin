
var crypto = require('crypto');

exports.encode = function(plain) {
    const salt = 'cleanbell';
    var encrypted = crypto.createHash('sha512').update(plain + salt).digest('base64');
    return encrypted;
}