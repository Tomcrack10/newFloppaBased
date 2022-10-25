const db = require('../../models/warns')

module.exports = {
    name : 'remove-all-warns',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('this command is restricted to staff members.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.reply('include a reason.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`:white_check_mark: Cleared ${user.user.tag}'s warnings.`)
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
    }
}
