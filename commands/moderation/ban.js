const Discord = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Bans a user from the server',
  run: async(client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("you don't have enough permissions to use this command!");
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply("I don't have enough permission to use this command!");
    
    let reason = args.slice(1).join(" ")
    const mentioned = message.mentions.members.first();
    
    if(!reason) reason = 'No reason specified.';
    if(!args[0]) return message.reply('please specify a user to ban.')
    if(!mentioned) return message.reply("please provide a valid user that is in the server.")
    if(mentioned.id === message.author.id) {
            return message.reply("you cannot ban yourself!")
        }
    if(!mentioned.bannable) return message.reply("That user has a role which is above me or is a mod/admin.");
    
    
    const embed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark: \`${mentioned.user.tag}\` **has been banned.**`)
    .setColor("GREEN")
    message.channel.send(embed)
    message.delete()
    
    await mentioned.send(`You have been banned from **${message.guild.name}** | ${reason}`).catch(err => console.log(err))
    await mentioned.ban({reason:reason}).catch(err => console.log(err))
    
  }
}
