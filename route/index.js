
module.exports = function (app, swaggerSpec) {

    app.use(require('./homeRoute')(swaggerSpec));
    app.use(require('./userRoute')(swaggerSpec));
    app.use(require('./loginRoute')(swaggerSpec));
};