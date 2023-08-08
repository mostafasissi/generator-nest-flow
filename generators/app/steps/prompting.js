const questions = require('../questions');
module.exports = {
    askApp() {
        return this.prompt(questions.app).then(answers => {
            this.answers = answers;
        });
    },
    askDescription(){
        return this.prompt(questions.description).then(answers => {
            this.answers = answers;
        });
    },
    askPackageManager(){
        return this.prompt(questions.packageManager).then(answers => {
            this.answers = answers;
        });
    }
}