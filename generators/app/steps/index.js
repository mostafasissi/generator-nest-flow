const init =  require('./init')
const prompting = require('./prompting');
const writing  = require('./writing');
const conflicts = require('./conflicts');
const configuring = require('./configuring');
const end = require('./end');
const install = require('./install')
module.exports = {
    init,
    prompting,
    writing,
    conflicts ,
    configuring ,
    install ,
    end
}