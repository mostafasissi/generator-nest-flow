const path =  require('path')
module.exports = function (){
    const pathToApp = path.join(this.options.answers.workplace , this.options.answers.projectName);
    if(this.options.answers.addTest === true ){
        if(this.options.answers.testType === 'End-To-End Test'){
            if(this.options.answers.testFramework === 'Pactum')
                this.spawnCommand('npm', ['install','--save-dev','pactum'], { cwd: pathToApp });
            else  if(this.options.answers.testFramework)
                this.spawnCommand('npm', ['install','--save-dev','supertest', '@nestjs/testing', 'jest'], { cwd: pathToApp });

        }
    }
}