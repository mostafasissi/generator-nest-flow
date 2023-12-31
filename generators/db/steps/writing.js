const updateAppModule = require('./updateRootModule')
module.exports = function () {
    const payload = {
        answers : this.options.answers ,
    }
    //console.log({payload});
    // <::> copier the basic template <::>
    const pathToApp =
        `${this.options.answers.workplace}/${this.options.answers.projectName}`;

    const globalAppModulePath =
        this.destinationPath(`${pathToApp}/src/app.module.ts`);

    if (!this.options.answers.addAuthentication){
        this.fs.copyTpl(
            this.templatePath('.env'),
            this.destinationPath(`${pathToApp}/.env`),
            {payload}
        )
        if (this.options.answers.useORM) {
            if (this.options.answers.ormType === 'Prisma') {
                this.fs.copyTpl(
                    this.templatePath('db-connection-with-orm/prisma-orm/prisma'),
                    this.destinationPath(`${pathToApp}/prisma`),
                    {
                        databaseType : this.options.answers.databaseType
                    }
                )
                // copier the prisma module
                this.fs.copyTpl(
                    this.templatePath('db-connection-with-orm/prisma-orm/prisma-module/**'),
                    this.destinationPath(`${pathToApp}/src/prisma`),
                )
                // update the AppModule
                updateAppModule('PrismaModule', './prisma' , globalAppModulePath);

            }
            else if (this.options.answers.ormType === 'TypeORM'){
                this.fs.copyTpl(
                    this.templatePath('db-connection-with-orm/typeorm/database'),
                    this.destinationPath(`${pathToApp}/src/database`),
                    {
                        databaseType : this.options.answers.databaseType
                    }
                )

                // update the AppModule
                updateAppModule('DatabaseModule', './database' , globalAppModulePath);
            }

            // add units tests for database connection service
            if(this.options.answers.addTest){
                if(this.options.answers.testType === 'Unit Test'){
                    if (this.options.answers.ormType === 'Prisma') {

                        const DB_URL =  `${payload.answers.databaseType}://${payload.answers.databaseName}:${payload.answers.databasePassword}@${payload.answers.databaseHost}:${payload.answers.databasePort}/${payload.answers.databaseName}`

                        this.fs.copyTpl(
                            this.templatePath('db-connection-with-orm/tests/unit-test/prisma.service.spec.ts'),
                            this.destinationPath(`${pathToApp}/src/prisma/prisma.service.spec.ts`),
                            {DB_URL ,}
                        )
                    }
                } else if (this.options.answers.ormType === 'TypeORM'){
                        this.fs.copyTpl(
                            this.templatePath('db-connection-with-orm/tests/unit-test/database.service.spec.ts'),
                            this.destinationPath(`${pathToApp}/src/database/database.service.spec.ts`),
                            payload
                        )
                    }
                }

        }
        else {
            if (this.options.answers.databaseType === 'mysql') {
                this.fs.copyTpl(
                    this.templatePath('db-connection-without-orm/mysql'),
                    this.destinationPath(`${pathToApp}/src/mysql`),
                )
                // update de appModule
                updateAppModule('MysqlModule', './mysql' ,globalAppModulePath  );
                this.log('updating the AppModule ....');

            }
            else if (this.options.answers.databaseType === 'postgresql'){
                this.fs.copyTpl(
                    this.templatePath('db-connection-without-orm/postgres'),
                    this.destinationPath(`${pathToApp}/src/postgres`),
                )
                updateAppModule('PostgresModule', './postgres' ,globalAppModulePath);
                this.log('updating the AppModule ....');
            }

            // add units tests for database connection service
            if(this.options.answers.addTest){
                if(this.options.answers.testType === 'Unit Test'){
                    if (this.options.answers.databaseType === 'mysql') {
                        this.fs.copyTpl(
                            this.templatePath('db-connection-without-orm/tests/unit-test/mysql.service.spec.ts'),
                            this.destinationPath(`${pathToApp}/src/mysql/mysql.service.spec.ts`)
                        )
                    }
                    else if (this.options.answers.databaseType === 'postgresql') {
                        this.fs.copyTpl(
                            this.templatePath('db-connection-without-orm/tests/unit-test/postgres.service.spec.ts'),
                            this.destinationPath(`${pathToApp}/src/postgres/postgres.service.spec.ts`)
                        )
                    }
                }
            }
        }
    }
    else {
        this.composeWith('nest-flow:auth', {
            answers: this.options.answers,
        });
    }

}
