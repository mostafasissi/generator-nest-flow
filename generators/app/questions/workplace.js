const path = require('path');
module.exports = [
    {
        type : 'input',
        name : 'workplace',
        message : 'Enter an workplace for your project (absolute path):',
        default : process.cwd(),
        validate: (input) => {
            const absolutePath = path.isAbsolute(input);
            if (!absolutePath) {
                return 'Please provide an absolute path.';
            }
            return true;
        },
    }
]