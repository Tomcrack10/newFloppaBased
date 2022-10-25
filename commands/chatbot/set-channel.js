const Discord = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database("mongodb+srv://MyUsernames_Sean:Gohabsgo12310@discordbot.ksg9p.mongodb.net/Data")

module.exports = {
        name: 'setchatbotchannel',
        description: 'Sets a ChatBot channel.',
        aliases: ["setchatbotchannel"], 
    run: async (client, message, args) => {
    
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: {
            color: "RED",
            description: `:x: You can't use this command.`
        }})
if (!args[0]) {
  let b = await db.fetch(`chatbot_${message.guild.id}`);
  let channelName = message.guild.channels.cache.get(b);
  if (message.guild.channels.cache.has(b)) {
    return message.channel.send(
      `**❗ Current chatbot channel: \`${channelName.name}\`!**`
    );
  } else
    return message.channel.send({embed: {
            color: "RED",
            description: `:x: Please enter a channel or channel ID to set.`
        }})
}
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

    if (!channel || channel.type !== 'text') return message.channel.send({embed: {
            color: config.embedcolor,
            description: `:x: Please provide a valid text channel.`
        }})

    try {
        let a = await db.fetch(`chatbot_${message.guild.id}`)

        if (channel.id === a) {
            return message.channel.send({embed: {
            color: "RED",
            description: `:x: This channel is already set as ChatBot channel!`
        }})
        } else {
            client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`**✔️ ChatBot channel set!**`)
            db.set(`chatbot_${message.guild.id}`, channel.id)

           message.channel.send({embed: {
            color: "GREEN",
            description: `✔️ Successfully set the ChatBot channel to <#${channel.id}>.`
        }})
        }
    } catch {
        return message.channel.send(`:x: This channel either doesn't exist or I don't have enough permissions.`);
    }
    }
}