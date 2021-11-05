const builders = require('@discordjs/builders');
const {config, client} = require('../utils/bot')
const notifyWelcomePic = require('../actions/notifyWelcomePic');
const countMembers = require('../actions/countMembers');
const {sendError, sendMessage} = require("../actions/notify");

const execute = async function (guildMember) {
    try {
        if (guildMember.guild.id !== config['guildId']) return;
        await countMembers()

        // notify
        await sendMessage('moderator', `🍄 ${builders.userMention(guildMember.user.id)} ${builders.inlineCode('JOINED')}`)

        // welcome pic
        await notifyWelcomePic(guildMember.user)

        // add locked role
        if (config['roles']) {
            const roleId = config['roles']['locked']
            if (roleId) {
                const guild = await client.guilds.cache.get(config['guildId'])
                const targetRole = await guild.roles.cache.get(roleId)
                const targetUser = await guild.members.cache.get(guildMember.user.id)
                await targetUser.roles.add(targetRole, 'New member, locked')
            }
        }
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'guildMemberAdd',
    execute,
}
