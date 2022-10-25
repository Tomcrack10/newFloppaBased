const { Client, Message, MessageEmbed } = require('discord.js')
const math = require('mathjs')

module.exports = {
        name: "math",
        aliases: ["calculate", "calc"],
        run: async (client, message, args) => {
                try {
                        message.channel.send(
                                new MessageEmbed()
                                        .addField("Question", args.join(" "))
                                        .addField("Solution", math.evaluate(args.join(" ")))
                        )
                } catch (err) {
                        message.channel.send("Your question is not valid!")
                }
        },
};