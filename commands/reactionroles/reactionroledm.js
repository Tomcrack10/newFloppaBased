const Guild = require('../../database/guild');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("../../packages/reactionrole/index.js")
const react = new ReactionRole()
const config = require("../../config.json");
react.setURL("mongodb+srv://MyUsernames_Sean:Gohabsgo12310@discordbot.ksg9p.mongodb.net/Data")

module.exports = {
        name: 'rreactionroledm',
        aliases: ["reactionrolesdm", "rrdirectmessages", "rrdm"],
        description: 'Enable / Disable Reaction Role DMs',
        category: 'Reaction Role',
        run: async(client, message, args) => {

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    

      
    
      let fail = message.client.emoji.fail
      let success = message.client.emoji.success
      const prefix = guildDB.prefix || 'i!';



   let properUsage = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`__**Proper Usage**__\n\n\`1-\` ${prefix}rrdm on\n\`2-\` ${prefix}rrdm off`)

      if (args.length < 1) {
        return message.channel.send(properUsage);
      }

 
      if (args.includes('disable') || args.includes('off')) {
  
      await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {
 if(guild.reactionDM === false) return message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} DMs are already disabled`)
   .setColor(client.color.red)
 )
        guild.updateOne({
          reactionDM: false
        })
        .catch(err => console.error(err));

message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Reaction Role DMs have been disabled!`)
   .setColor(client.color.red)
 )
    })
      } else if (args.includes('enable') || args.includes('on')) {


     await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {

 if(guild.reactionDM === true) return message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} DMs are already enabled`)
   .setColor(client.color.red))
        guild.updateOne({
          reactionDM: true
        })
        .catch(err => console.error(err));

 
message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Reaction Role DMs have been enabled!`)
   .setColor(client.color.red)
 )

   })

    } else if(args[0]) {
     message.channel.send(properUsage) 
    } else {
 message.channel.send(properUsage) 

    }


    }
};