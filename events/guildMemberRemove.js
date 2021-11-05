const builders = require('@discordjs/builders');
const {config, debug, notifyChannels} = require('../utils/bot')
const countMembers = require("../actions/countMembers");
const {sendError, sendMessage} = require("../actions/notify");


const execute = async function (guildMember) {
    try {
        if (guildMember.guild.id !== config['guildId']) return;
        await countMembers()

        let text = `✈️ ${builders.userMention(guildMember.user.id)}`

        const fetchedLogs = await guildMember.guild.fetchAuditLogs({limit: 1, type: 'MEMBER_KICK'})
        const kickLog = fetchedLogs.entries.first()

        if (!kickLog) {
            text += ` ${builders.inlineCode('LEFT')}`
        } else {
            const {executor, target} = kickLog;

            if (target.id === guildMember.user.id) {
                text += `  was ${builders.inlineCode('KICKED OUT')} by ${builders.userMention(executor.id)}`
                if (kickLog.reason) {
                    text += ` for ${builders.inlineCode(kickLog.reason)}`
                }
            } else {
                text += ` ${builders.inlineCode('LEFT')}`
            }
        }
        await sendMessage('moderator', text)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'guildMemberRemove',
    execute,
}
