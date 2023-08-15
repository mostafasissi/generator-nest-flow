const updateAppModule = require('./updateRootModule')
module.exports = function () {
    const payload = {
        answers: this.options.answers,
    }
    const pathToApp = this.options.answers.projectName;
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
            updateAppModule('PrismaModule', './prisma' , globalAppModulePath);
            // copier the auth module ;
            this.fs.copyTpl(
                this.templatePath('prisma-auth/auth'),
                this.destinationPath(`${pathToApp}/src/auth`)
            )
            //update the appModule
            updateAppModule('AuthModule','./auth' , globalAppModulePath);
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
            updateAppModule('DatabaseModule', './database' , globalAppModulePath);

            // copier the auth module ;
            this.fs.copyTpl(
                this.templatePath('typeorm-auth/auth'),
                this.destinationPath(`${pathToApp}/src/auth`)
            )
            //update the appModule
            updateAppModule('AuthModule','./auth' , globalAppModulePath);

        }
    }
}