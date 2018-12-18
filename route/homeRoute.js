const express = require('express');
const router = express.Router();

const base = require('../controller/baseController');
const controller = require('../controller/homeController');

module.exports = function (swaggerSpec) {

    router.get('/', base.render(controller.index));
    router.get('main', base.render(controller.index));
    
    return router;
}