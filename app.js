
const APP_VERSION = 'v' + require('./package.json').version;

const Q = require('q');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

config.web.port = config.web.port || 3002;

console.log('ENVIRONMENT - ' + process.env.NODE_ENV);
console.log('CONFIGURATION - ' + JSON.stringify(config));

global.rootpath = process.cwd();
global.config = config;

const app = express();

require('./model/db/connector')
    .then(function (models) {

        global.dbmodels = models;
        
        init();
    });

const init = function () {

    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    require('./controller/authController').initialize(app);
    
    const preProcessor = require('./controller/baseController').preProcess;
    app.use(preProcessor);
    
    let swaggerOptions = {
        swaggerDefinition: {
            info: {
                title: 'Cleanbell Premium API Docs',
                description: '',
                version: APP_VERSION,
                contact: {
                    email: 'cleanbell1104@gmail.com'
                }
            },
            host: config.web.host + ':' + config.web.port,
            basePath: '/api',
            schemes: ['http']
        },
        apis: []
    };
    
    let swaggerSpec = swaggerJsDoc(swaggerOptions);
    
    require('./route')(app, swaggerSpec);
    require('./model')(swaggerSpec);
    
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {}));
    
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Unexpected Error');
    });
    
    app.listen(config.web.port, function () {
        console.log('Cleanbell Premium Admin listening on port %d', config.web.port);
    });
}