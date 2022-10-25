const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "lock",
  run: async (client, message, args) => {
let embedYes = new MessageEmbed()
 .setDescription("Channel Locked.")
 .setFooter("Use ?unlock to unlock the channel again.")
 .setColor("GREEN")
 if(message.member.hasPermission("MANAGE_CHANNELS")) {
 message.channel.send(embedYes)
 message.channel.updateOverwrite(message.guild.roles.everyone, {
SEND_MESSAGES: false
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
