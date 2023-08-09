
module.exports = function () {
    const payload = {
        answers : this.answers ,
    }
    // <::> copier the basic template <::>
    const pathToApp = this.answers.projectName;
    console.log(payload);
    this.fs.copyTpl(
        this.templatePath('basic-template/**'),
        this.destinationPath(`${pathToApp}`),
        {payload}
    );
}