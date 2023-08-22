const path =  require('path')

module.exports =function (){
    const pathToApp = path.join(this.options.answers.workplace , this.options.answers.projectName);

    if (!this.options.answers.addAuthentication){
        if (this.options.answers.useORM) {
            if (this.options.answers.ormType === 'Prisma') {
               this.spawnCommand('npm' , ['install', 'prisma','@prisma/client', '--save-dev'] , {cwd : pathToApp})
            }
            else if (this.options.answers.ormType === 'TypeORM'){
                // if database = mysql => npm install --save typeorm @nestjs/typeorm mysql2
                // if database = postgresql => npm install --save @nestjs/typeorm typeorm pg
                this.spawnCommand('npm' , ['install' , 'typeorm' , '@nestjs/typeorm' , '--save'] , {cwd : pathToApp})

                if (this.options.answers.databaseType === 'mysql')
                    this.spawnCommand('npm' , ['install' , 'mysql2' , '--save'] , {cwd : pathToApp})
                else if(this.options.answers.databaseType === 'postgresql')
                    this.spawnCommand('npm' , ['install' , 'pg' , '--save'] , {cwd : pathToApp})
            }
        }
        else {
            if (this.options.answers.databaseType === 'mysql') {
                this.spawnCommand('npm' , ['install' , 'mysql2' , '--save'] , {cwd : pathToApp})
            }
            else if (this.options.answers.databaseType === 'postgresql'){
                this.spawnCommand('npm' , ['install' , 'pg' , '--save'] , {cwd : pathToApp})
            }
        }
    }
}