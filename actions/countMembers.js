const {config, client, notifyChannels} = require('../utils/bot')


module.exports = async function () {
    const guildMemberCountChannel = notifyChannels['guildMemberCount']
    if (!guildMemberCountChannel) return;

    const guild = await client.guilds.cache.get(config['guildId'])
    const guildMemberCount = guild.memberCount
    await guildMemberCountChannel.setName(`📊│Users: ${guildMemberCount}`)
}
