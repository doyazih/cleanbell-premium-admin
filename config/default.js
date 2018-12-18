module.exports = {
    web: {
        host: 'localhost',
        port: 3002
    },
    auth: {
        secret_key: 'secret',
        token_expire: '30d',
        cookie_expire: 2592000000
    },
    datasources: {
        mssql: {
            connection: {
                host: '',
                username: '',
                password: '',
                database: ''
            }
        }
    }
}