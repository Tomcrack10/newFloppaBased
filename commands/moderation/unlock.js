const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "unlock",
  run: async (client, message, args) => {
let embedYes = new MessageEmbed()
 .setDescription("Channel Unlocked.")
 .setFooter("Use ?lock to lock the channel again.")
 .setColor("GREEN")
 if(message.member.hasPermission("MANAGE_CHANNELS")) {
 message.channel.send(embedYes)
 message.channel.updateOverwrite(message.guild.roles.everyone, {
SEND_MESSAGES: true
});
 } else {
 let embed2 = new MessageEmbed()
 .setTitle("Error")
 .setColor("RED")
 .setDescription("You don't have permission to use this command.")
 message.channel.send(embed2)
    }
  }
 }
