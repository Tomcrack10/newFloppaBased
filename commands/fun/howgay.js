const { Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
        name: "howgay",
        run: async (client, message, agrs) => {
                const member = message.mentions.users.first() || message.author

                const rng = Math.floor(Math.random() * 101);

                const howgayembed = new MessageEmbed()
                        .setTitle(`Howgay machine o_O`)
                        .setDescription(`${member.username} is ` + rng + "% gay. 🌈")

                        message.channel.send(howgayembed)
        },
};
