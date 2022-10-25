const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name : 'blacklist-user',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(message.author.id !== '711602696133673011') return message.channel.send(':x: This is an owner only command.')
        const User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send('User is not valid.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(`:x: **${User.user.tag}** has already been blacklisted!`)
            } else {
                data = new blacklist({ id : User.user.id })
                data.save()
                .catch(err => console.log(err))
            message.channel.send(`${User.user.tag} has been added to blacklist.`)
            }
           
        })
    }
}
