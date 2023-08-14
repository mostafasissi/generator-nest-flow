const chalk = require('chalk');
const questions = require('../questions');

function askQuestions(title, questions) {
    this.log(chalk.yellow(`\n${title} questions:`));

    return this.prompt(questions).then(answers => {
        this.answers = Object.assign(this.answers || {}, answers);
    });
}

module.exports = {
    askAppName() {
        return askQuestions.call(
            this,
            'Application and host',
            questions.app);
    },
    asKDescription(){
        return askQuestions.call(
            this ,
            'Description' ,
            questions.description);
    },
    askPackageManager() {
        return askQuestions.call(
            this,
            'Package Manager',
            questions.packageManager
        );
    },
    askDbConnection(){
        return askQuestions.call(
            this,
            'Database Connection',
            questions.dbConnection
        );
    },
    addAthentication(){
        return askQuestions.call(
            this ,
            'Authentication ',
            questions.addAuthentication
            )
    }
};