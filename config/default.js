module.exports = {
    web: {
        host: 'localhost',
        port: 3002
    },
    auth: {
        secret_key: 'zmfflsqpfEkffkd90',
        token_expire: '30d',
        cookie_expire: 2592000000
    },
    datasources: {
        mssql: {
            connection: {
                host: 'cleanbell-test.database.windows.net',
                username: 'cbuser',
                password: 'zmfflsqpfEkffkd90',
                database: 'cbdb-test'
            }
        }
    }
}