module.exports = function (swagger) {
    Object.assign(swagger.definitions, require('./userModel'));
};