const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
        name: "8ball",
        run: async (client, message, args) => {
                if(!args[0]) return message.reply("Please specify a question!");
                const replies = ["It is Certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."]

                const result = Math.floor((Math.random() * replies.length));
                const question = args.slice().join(" ")

                const ballembed = new MessageEmbed()
                        .setAuthor(`🎱 The 8ball says...`)
                        .setColor("#1C1C1C")
                        .addField("Question", question)
                        .addField("Answer", replies[result])

                        message.channel.send(ballembed)
        },
};