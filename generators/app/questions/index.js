const packageManager = require('./packageManager');
const app = require('./app');
const description = require('./description');
const dbConnection = require('./db-connection');
const addAuthentication = require('./auth');
module.exports = {
    packageManager ,
    app ,
    description,
    dbConnection,
    addAuthentication
}