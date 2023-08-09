module.exports = function() {
    console.log({
        appAnswers : this.answers
    })
    this.composeWith('nest-flow:db', {
        answers: this.answers,
    });
}