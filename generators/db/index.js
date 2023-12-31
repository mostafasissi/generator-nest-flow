const Generator = require('yeoman-generator');
const generatorSteps = require('./steps');
module.exports = class DatabaseConnectionGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.log('Initializing DatabaseConnectionGenerator ...');
    }
    get configuring() {
        return generatorSteps.configuring;
    }

    get conflicts() {
        return generatorSteps.conflicts;
    }

    get initializing() {
        return generatorSteps.init;
    }

    get prompting() {
        return generatorSteps.prompting;
    }

    get writing() {
        return generatorSteps.writing;
    }

    get install() {
        return generatorSteps.install;
    }

    get end() {
        return generatorSteps.end;
    }

};