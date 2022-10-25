const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "set-warn-msg",
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(message.author).has("MANAGE_GUILD")) return message.channel.send(":x: | **You dont have permissions to use this Command!**");
    let msg = args.join(" ")
    if (!msg) {
      return message.channel.send("Provide a message.")
    }
    db.set(`message_${message.guild.id}`, msg)
    let embed = new Discord.MessageEmbed()
    embed.setTitle("Message Set!")
    embed.setTimestamp()
    embed.setAuthor(message.guild.name, message.guild.iconURL())
    embed.addField("message", msg)
    embed.addField("preview", msg.split("{user-mention}").join("<@"+message.author.id+">").split("{server-name}").join(message.guild.name).split("{user-tag}").join(message.author.tag).split("{user-username}").join(message.author.username))
    embed.setColor("GREEN")
    return message.channel.send({ embed: embed })
  }
}