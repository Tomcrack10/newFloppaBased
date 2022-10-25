const { Client, Message, MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord")

module.exports = {
        name: "blur",
        run: async (client, message, args) => {
                const user = message.mentions.users.first() || message.author;

                const avatar = user.displayAvatarURL({ format: "png" });

                const image = await Canvas.blur(avatar);

                message.channel.send(new MessageAttachment(image, "image.gif"))
        }
}