const { Client, Message, MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord")

module.exports = {
        name: "spank",
        run: async (client, message, args) => {
                const user = message.mentions.users.first()
                if (!user) return message.reply('Please specify a member');

                const avatar = user.displayAvatarURL({ format: "png" });

                const image = await Canvas.spank(
                        message.author.displayAvatarURL({ format: "png" }),
                        avatar
                );

                message.channel.send(new MessageAttachment(image, "image.gif"))
        }
}