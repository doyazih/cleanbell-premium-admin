
var dbConnectionConfig = global.config.datasources.mssql.connection;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConnectionConfig.database,
    dbConnectionConfig.username,
    dbConnectionConfig.password,
    {
        host: dbConnectionConfig.host,
        dialect: 'mssql',
        dialectOptions: {
            encrypt: true
        },
        pool: {
            max: 100,
            min: 0,
            idle: 10000,
            acquire: 10000,
        },
        timezone: '+09:00'
	});
	
var AdminUsers = sequelize.import('adminUserModel');

module.exports = sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        sequelize.sync();

        return {
            Users: AdminUsers,
        }
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

