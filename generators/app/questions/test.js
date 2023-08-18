module.exports = [
    {
        where : answers => answers.addDataBaseConnection === true ,
        type : 'confirm',
        name : 'addTest',
        message : 'Do you want to add tests ?',
        default : true
    },
    {
        where : answers => answers.addDatabaseConnection === true && answers.addTest === true ,
        type: 'list',
        name: 'testType',
        message: 'which kind of tests do you want to add ?',
        default: 'Unit Test',
        choices : ['Unit Test', 'End-To-End Test', 'Integration Test']
    }
]