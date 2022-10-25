const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  run: async (client, message, args) => {
    let question = args[0];
    if (message.mentions.users.size) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if (member) {
        
        const emb = new Discord.MessageEmbed()
          .setImage(member.displayAvatarURL({ dynamic: true, size: 512 }))
          .setTitle(member.username + `'s Avatar`)
          .setColor(`${config.activecolor}`)
          .setFooter(`Requested by: ${message.author.tag}`);
        message.channel.send(emb);
      } else {
        
        message.reply("An error occured.");
      }
    } else {
      message.delete();
      const emb = new Discord.MessageEmbed()
        .setImage(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTitle(message.author.username + `'s Avatar`)
        .setColor(`RANDOM`)
        .setFooter(`Requested by: ${message.author.tag}`);
      message.channel.send(emb);
    }
  },
};
