
const userModel = {
    type: 'object',
    required: ['id', 'name', 'email', 'authority'],
    properties: {
        seq: {
            type: 'long'
        },
        id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        authority: {
            type: 'string',
            enum: ['admin', 'manager']
        }
    }
}

exports.User = userModel;

const createUserRequestModel = JSON.parse(JSON.stringify(userModel));
delete createUserRequestModel.seq;

exports.CreateUserRequest = createUserRequestModel;