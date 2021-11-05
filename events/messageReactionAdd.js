const builders = require("@discordjs/builders");
const {config} = require('../utils/bot');
const reactionRulesAllMatched = require('../functions/reactionRulesAllMatched');
const {sendError, sendMessage} = require("../actions/notify");


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
        await sendMessage('moderator', `${reaction.emoji.name} ${reactionUser}`
            + ` ${builders.inlineCode('AGREED')} with the ${builders.channelMention(reaction.message.channelId)}`)

        // remove and add roles
        if (initRole) await reactionUser.roles.remove(initRole, 'Rules Agreed')
        if (agreedRole) await reactionUser.roles.add(agreedRole, 'Rules Agreed')
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'messageReactionAdd',
    execute,
}
