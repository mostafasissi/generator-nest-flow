const path =  require('path')
module.exports = function (){
    const pathToApp = path.join(this.options.answers.workplace , this.options.answers.projectName);
    if(this.options.answers.addTest === true ){
        if(this.options.answers.testType === 'Unit Test'){
            this.spawnCommand('npm', ['install','--save-dev','pactum'], { cwd: pathToApp });
        }
    }
}