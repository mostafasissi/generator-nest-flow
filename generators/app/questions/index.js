const packageManager = require('./packageManager');
const app = require('./app');
const description = require('./description');
const dbConnection = require('./db-connection');
module.exports = {
    packageManager ,
    app ,
    description,
    dbConnection
}