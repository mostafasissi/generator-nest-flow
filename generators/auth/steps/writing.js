const updateAppModule = require('./updateRootModule')
module.exports = function () {
    const payload = {
        answers: this.options.answers,
    }
 //console.log(this)
    const pathToApp =
        `${this.options.answers.workplace}/${this.options.answers.projectName}`;
    const globalAppModulePath =
        this.destinationPath(`${pathToApp}/src/app.module.ts`);
    // copier the .env file
    this.fs.copyTpl(
        this.templatePath('.env'),
        this.destinationPath(`${pathToApp}/.env`),
        {payload}
    )
    if (this.options.answers.useORM) {
        // add authentication with orm = prisma and jwt
        if (this.options.answers.ormType === 'Prisma') {

            // copier the prisma schema
            this.fs.copyTpl(
                this.templatePath('prisma-auth/prisma'),
                this.destinationPath(`${pathToApp}/prisma`),
                {
                    databaseType : this.options.answers.databaseType
                }
            )
            // copier the prisma module
            this.fs.copyTpl(
                this.templatePath('prisma-auth/prisma-module'),
                this.destinationPath(`${pathToApp}/src/prisma`)
            )
            // update appModule
            updateAppModule('PrismaModule', './prisma/prisma.module' , globalAppModulePath);
            // copier the auth module ;
            this.fs.copyTpl(
                this.templatePath('prisma-auth/auth'),
                this.destinationPath(`${pathToApp}/src/auth`)
            )
            //update the appModule
            updateAppModule('AuthModule','./auth/auth.module' , globalAppModulePath);


            // add end-to-end tests
            if (this.options.answers.addTest === true){
                if(this.options.answers.testType === 'End-To-End Test'){
                    if (this.options.answers.testFramework === 'Supertest'){
                        this.fs.copyTpl(
                            this.templatePath('prisma-auth/test/e2e-supertest'),
                            this.destinationPath(`${pathToApp}/test`)
                        )
                    } else if (this.options.answers.testFramework === 'Pactum'){
                        this.fs.copyTpl(
                            this.templatePath('prisma-auth/test/e2e-jest-pactum'),
                            this.destinationPath(`${pathToApp}/test`)
                        )
                    }
                }
                else if(this.options.answers.testType === 'Unit Test'){
                    this.fs.copyTpl(
                        this.templatePath('prisma-auth/test/unit-test/**'),
                        this.destinationPath(`${pathToApp}/src/`)
                    )
                }
            }
        }
        else if (this.options.answers.ormType === 'TypeORM'){
            this.fs.copyTpl(
                this.templatePath('typeorm-auth/database'),
                this.destinationPath(`${pathToApp}/src/database`),
                {
                    databaseType : this.options.answers.databaseType
                }
            )

            // update the AppModule
            updateAppModule('DatabaseModule', './database/database.module' , globalAppModulePath);

            // copier the auth module ;
            this.fs.copyTpl(
                this.templatePath('typeorm-auth/auth'),
                this.destinationPath(`${pathToApp}/src/auth`)
            )
            //update the appModule
            updateAppModule('AuthModule','./auth/auth.module' , globalAppModulePath);

        }
    }
}