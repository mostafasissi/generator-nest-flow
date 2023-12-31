
module.exports = function () {
    const payload = {
        answers : this.answers ,
    }
    // <::> copier the basic template <::>
    const pathToApp = `${this.answers.workplace}/${this.answers.projectName}`;
    this.fs.copyTpl(
        this.templatePath('basic-template/**'),
        this.destinationPath(`${pathToApp}`),
        {payload}
    );
}