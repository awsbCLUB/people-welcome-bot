const builders = require("@discordjs/builders");
const {config} = require('../utils/bot');
const {sendError, sendMessage} = require("../actions/notify");
const reactionRulesAllMatched = require("../functions/reactionRulesAllMatched");


const execute = async function (reaction, user) {
    try {
        if (reaction.message.guildId !== config['guildId']) return;
        if (user.bot) return;
        if (reaction.partial) await reaction.fetch();

        // match
        let reactionUser
        let agreedRole
        let initRole
        [reactionUser, agreedRole, initRole] = await reactionRulesAllMatched(reaction, user)

        // reaction matched
        if (!reactionUser) return;

        // notify to moderator channel
        await sendMessage('moderator', `💔 ${reactionUser}`
            + ` ${builders.inlineCode('DISAGREED')} with the ${builders.channelMention(reaction.message.channelId)}`)

        // remove and add roles
        if (agreedRole) await reactionUser.roles.remove(agreedRole, 'Rules Disagreed')
        if (initRole) await reactionUser.roles.add(initRole, 'Rules Disagreed')
    } catch (e) {
        await sendError(e)
    }

}

module.exports = {
    name: 'messageReactionRemove',
    execute,
}
