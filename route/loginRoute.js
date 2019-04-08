const express = require('express');
const router = express.Router();

const controller = require('../controller/loginController');

module.exports = function (swaggerSpec) {

    router.get(
        '/login', 
        controller.index
    );

    router.get(
        '/logout', 
        controller.logout
    );

    router.post(
        '/login/authenticate',
        controller.authenticate
    );
    
    return router;
}