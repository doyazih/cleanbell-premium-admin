const Q = require('q');

const { validationResult } = require('express-validator/check');

const log4js = require('log4js');

const logger = log4js.getLogger();

const util = require('util');

const initializeView = (req, res, next) => {
    res.viewbag = {};
    res.viewbag.title = 'Cleanbell Premium';
    res.viewbag.headStyles = new Array();
    res.viewbag.headScripts = new Array();

    next();
}

exports.preProcess = (req, res, next) => {
    res.viewbag = {};    
    next();
}

exports.render = function (action) {
    return [
        initializeView,
        action,
        function (req, res, next) {
            res.render('../view/common/_sharedLayout', res.viewbag);
            next();
        }
    ];
}

exports.response = function (action) {
    return function (req, res, next) {
        try {
            return action(req, res, next)
            .then(function (data) {
    
                if (res && !res.headersSent) {
                    res.status(200).json(data);
                }
    
                return next();
            })
            .catch(function (err) {
                return errorHandler(err, res);
            });
        }
        catch (err) {
            return errorHandler(err, res);
        }
    }
}

exports.authenticate = function () {
    
    return function (req, res, next) {

        next();

        // To do for authentication
    }
}

exports.setSwagger = function (swaggerSpec, path, apiSpec) {

    Object.keys(apiSpec).forEach(function (method) {
        if (!apiSpec[method].responses) {
            apiSpec[method].response = {};
        }
        apiSpec[method].responses[400] = apiSpec[method].responses[400] || { schema: { $ref: '#/definitions/Error' }, description: 'Bad request' };
        apiSpec[method].responses[401] = apiSpec[method].responses[401] || { schema: { $ref: '#/definitions/Error' }, description: 'Unauthorized' };
        apiSpec[method].responses[403] = apiSpec[method].responses[403] || { schema: { $ref: '#/definitions/Error' }, description: 'Forbidden' };
        apiSpec[method].responses[404] = apiSpec[method].responses[404] || { schema: { $ref: '#/definitions/Error' }, description: 'Not found' };
        apiSpec[method].responses[422] = apiSpec[method].responses[422] || { schema: { $ref: '#/definitions/Error' }, description: 'Validation failed' };
        apiSpec[method].responses[500] = apiSpec[method].responses[500] || { schema: { $ref: '#/definitions/Error' }, description: 'Unexpected error occured' };
    })

    swaggerSpec.paths[path] = apiSpec;
    return function (req, res, next) {
        next();
    }
};

exports.validate = function (checks) {
    
    var middlewares = checks;
    
    middlewares.push(function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            var message = '';
            
            errors.array().forEach((e, idx) => {
                var str = util.format('%s \'%s\' in %s.%s.', e.msg, e.value, e.location, e.param);
                message = message == '' ? str : message + '\n' + str;
            });

            var error = new Error(message);
            error.req = req;

            logger.error(error);

            return res.status(422).json({ message: message });
        }
        next();
    });

    return middlewares;
};

const errorHandler = function (err, res) {

    if (res && !res.headersSent) {
        res.status(500).json({ message: err.message })
    }
    
    console.error(err);

    return;
}

