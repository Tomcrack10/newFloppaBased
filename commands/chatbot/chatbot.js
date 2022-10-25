const Discord = require('discord.js');
const config = require('../../config.json');
const { Database } = require("quickmongo")
const db = new Database("mongodb+srv://MyUsernames_Sean:Gohabsgo12310@discordbot.ksg9p.mongodb.net/Data")


module.exports = {
        name: 'chatbot',
        description: 'Shows ChatBot\'s configuration.',
        aliases: ["chatbot"],
    run: async (client, message, args) => {
      const embedd = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `🤖 ChatBot Configuration 

        **❗ Usage :**
         Type \`${config.prefix}setchatbotchannel\` - To set a channel. 
         Type \`${config.prefix}disablechatbotchannel\` - To disable a channel.
         ChatBot channel currently set - None

        **❗ Examples :**
         \`${config.prefix}setchatbotchannel\` <#${message.channel.id}>
         \`${config.prefix}disablechatbotchannel\` <#${message.channel.id}>`
      )
      .setTimestamp()
      .setFooter(
        `Command Requested by: ${message.author.tag}`
      )
      .setColor("RANDOM");
    
     let channel1 = await db.fetch(`chatbot_${message.guild.id}`);
    if(!channel1) return message.channel.send(embedd)
    var sChannel = message.guild.channels.cache.get(channel1);
    let embedvch = "<#" + sChannel.id + ">"
    
    const embed = new Discord.MessageEmbed()
    
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `**ChatBot Configuration** 

        **❗ Usage:**
         Type \`${config.prefix}setchatbotchannel\` - To set a chatbot channel. 
         Type \`${config.prefix}disablechatbotchannel\` - To disable a chatbot channel.
         Chatbot channel has been set! - ${embedvch} 

        **❗ Examples:**
         \`${config.prefix}setchatbotchannel\` <#${message.channel.id}>
         \`${config.prefix}disablechatbotchannel\` <#${message.channel.id}>`
                    )
      .setTimestamp()
      .setFooter(
        `Command Requested by: ${message.author.tag}`,
      )
      .setColor("RANDOM");
    message.channel.send(embed);
  }
}