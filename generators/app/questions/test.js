module.exports = [
    {
        type : 'confirm',
        name : 'addTest',
        message : 'Do you want to add tests ?',
        default : true
    },
    {
        when : answers => answers.addTest === true ,
        type: 'list',
        name: 'testType',
        message: 'which kind of tests do you want to add ?',
        default: 'Unit Test',
        choices : ['Unit Test', 'End-To-End Test', 'Integration Test']
    } ,
    {
        when : answers => answers.testType === 'End-To-End Test' ,
        type: 'list' ,
        message: 'which kind test framework do want to use ?' ,
        name: 'testFramework',
        default: 'Supertest' ,
        choices: ['Supertest' , 'Pactum']
    }
]