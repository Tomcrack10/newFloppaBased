const Discord = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database("mongodb+srv://MyUsernames_Sean:Gohabsgo12310@discordbot.ksg9p.mongodb.net/Data")

module.exports = {
        name: 'disablechatbotchannel',
        description: 'Disables a ChatBot channel.',
        aliases: ["disablechatbotchannel"],
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: {
            color: "RED",
            description: `:x: You can't use this command.`
        }})
    try {
        let a = db.fetch(`chatbot_${message.guild.id}`)

        if (!a) {
            return message.channel.send({embed: {
            color: "RED",
            description:  ` :x: There isn't a chatbot channel set for me to disable.`
        }})
        } else {
            let channel = message.guild.channels.cache.get(a)
           // client.guilds.cache.get(message.guild.id).channels.cache.get(channel.ID).send(`** ✔️ ChatBot Channel Disabled!**`)
            db.delete(`chatbot_${message.guild.id}`)
    
            message.channel.send({embed: {
            color: "GREEN",
            description: `✔️ Chatbot channel has been successfully disabled.`
        }})
        }
        return;
    } catch(err) {
        console.log(err)
        return message.channel.send(`:x: This channel either doesn't exist or I don't have enough permissions.`)
    }

    }
};