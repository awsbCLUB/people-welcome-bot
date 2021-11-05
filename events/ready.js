const onboard = require('../actions/onboard');
const countMembers = require('../actions/countMembers');
const heartBeat = require('../cron/heartBeat');
const {sendError} = require('../actions/notify');


const execute = async function (client) {
    try {
        await onboard(client)
        await countMembers()
        await heartBeat('* * * * *')
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'ready',
    once: true,
    execute,
}
