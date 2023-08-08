const questions = require('../questions');
module.exports = {
    askApp() {
        return this.prompt(questions.app).then(answers => {
            this.answers = answers ;
        });
    },
}