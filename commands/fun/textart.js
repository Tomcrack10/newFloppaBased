const { Client, Message, MessageEmbed } = require('discord.js')
const figlet = require('figlet')

module.exports = {
        name: "text-art",
        run: async (client, message, args) => {
                figlet.text(
                        args.join(" "),
                        {
                                font: "Ghost",
                        },
                        async (err, data) => {
                                message.channel.send(`\`\`\`${data}\`\`\``)
                        }
                )
        },
};