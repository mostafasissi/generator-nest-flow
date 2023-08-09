const updateAppModule = require('./updateRootModule')
module.exports = function () {
    const payload = {
        answers : this.options.answers ,
    }
    console.log({payload});
    // <::> copier the basic template <::>
    const pathToApp = this.options.answers.projectName;

    this.fs.copyTpl(
        this.templatePath('.env'),
        this.destinationPath(`${pathToApp}/.env`),
        {payload}
    )
    if (!this.options.answers.useORM) {
        if (this.options.answers.databaseType === 'MySQL') {
            this.fs.copyTpl(
                this.templatePath('db-connection-without-orm/mysql'),
                this.destinationPath(`${pathToApp}/src/mysql`),
            )
            // update de appModule
            updateAppModule('MysqlModule', './mysql' , `${pathToApp}/src/app.module.ts` );
            this.log('updating the AppModule ....');
        }
        else if (this.options.answers.databaseType === 'PostgreSQL'){
            this.fs.copyTpl(
                this.templatePath('db-connection-without-orm/postgres'),
                this.destinationPath(`${pathToApp}/src/postgres`),
            )
            updateAppModule('PostgresModule', './postgres' ,`${pathToApp}/src/app.module.ts`);
            this.log('updating the AppModule ....');
        }
    }


}
