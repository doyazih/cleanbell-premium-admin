eval(require('fs').readFileSync('./public/js/types.js').toString());

const express = require('express');
const router = express.Router();

const { buildCheckFunction } = require('express-validator/check');
const checkQuery = buildCheckFunction(['query']);
const checkBody = buildCheckFunction(['body']);

const base = require('../controller/baseController');
const controller = require('../controller/userController');

module.exports = function (swaggerSpec) {
    
    router.post('/api/createUser',
        base.setSwagger(swaggerSpec, '/createUser', {
            post: {
                security: [ { BearerAuth: [] } ],
                tags: ['User'],
                parameters: [{
                    in: 'body',
                    name: 'user',
                    required: true,
                    schema: {
                        $ref: '#/definitions/CreateUserRequest'
                    }
                }],
                responses: {
                    200: {
                        description: 'ok',
                        schema: {
                            $ref: '#/definitions/User'
                        }
                    }
                }
            }
        }),
        base.authenticate(),
        base.validate([
            checkBody('id').not().isEmpty(),
            checkBody('name').not().isEmpty(),
            checkBody('email').optional(),
            checkBody('authority').isIn([AuthorityTypes.Manager, AuthorityTypes.Administrator]),
        ]), 
        base.response(controller.createUser)
    );

    router.get('/api/getUser',
        base.setSwagger(swaggerSpec, '/getUser', {
            get: {
                security: [ { BearerAuth: [] } ],
                tags: ['User'],
                parameters: [
                    {
                        name: 'id',
                        in: 'query',
                        required: true,
                        type: 'string'
                    }
                ],
                responses: {
                    200: {
                        description: 'ok',
                        schema: {
                            $ref: '#/definitions/User'
                        }
                    }
                }
            }
        }),
        base.authenticate(),
        base.validate([
            checkQuery('id').not().isEmpty()
        ]),
        base.response(controller.getUser)
    );
    
    return router;
}