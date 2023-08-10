module.exports = [
    {
        type: 'confirm',
        name: 'addDatabaseConnection',
        message: 'Do you want to add a database connection?',
        default: true, // Set the default value (Yes/True)
    },
    {
        when: answers => answers.addDatabaseConnection === true,
        type: 'list',
        name: 'databaseType',
        message: 'Which database type do you want to use?',
        default: 'mysql',
        choices: ['mysql', 'postgresql',],
    },
    {
        when: answers => answers.addDatabaseConnection === true,
        type: 'input',
        name: 'databaseHost',
        message: 'Enter the host address of your database:',
        default: 'localhost',
    },
    {
        when: answers => answers.addDatabaseConnection === true,
        type: 'input',
        name: 'databasePort',
        message: 'Enter the port number for the database connection:',
        default: 5432, // Default port for PostgreSQL
    },
    {
        when: answers => answers.addDatabaseConnection === true,
        type: 'input',
        name: 'databaseUsername',
        message: 'Enter the username for the database:',
        default: 'user',
    },
    {
        when: answers => answers.addDatabaseConnection === true,
        type: 'password',
        name: 'databasePassword',
        message: 'Enter the password for the database:',
    },
    {
        when: answers =>  answers.addDatabaseConnection === true,
        type: 'input',
        name: 'databaseName',
        message: 'Enter the name of the database:',
        default: 'mydb',
    },
    {
        when: answers => answers.addDatabaseConnection === true,
        type: 'confirm',
        name: 'useORM',
        message: 'Do you want to use an ORM for database interaction?',
        default: true,
    },
    {
        when: answers => answers.useORM === true,
        type: 'list',
        name: 'ormType',
        message: 'Select an ORM:',
        choices: ['TypeORM', 'Prisma', 'Other'],
    },
]