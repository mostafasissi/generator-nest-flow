const chalk = require('chalk');
const yosay = require('yosay');

module.exports = {
    sayHello() {
        this.log(
            yosay(
                `Welcome to the \n ${chalk.bgRed.white.bold(
                    'NEST FLOW Generator!',
                )} \n a nest.js generator \n Let's scaffold a new ${chalk.bgRed.white('NESTJS APP')}`,
            ),
        );
    },
};