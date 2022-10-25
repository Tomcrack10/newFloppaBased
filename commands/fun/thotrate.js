const { Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
        name: "thotrate",
        run: async (client, message, agrs) => {
                const member = message.mentions.users.first() || message.author

                const rng = Math.floor(Math.random() * 101);

                const thotrateembed = new MessageEmbed()
                        .setTitle(`Thotrate machine o_O`)
                        .setDescription(`${member.username} is ` + rng + "% Thotting😏")

                        message.channel.send(thotrateembed)
        },
};