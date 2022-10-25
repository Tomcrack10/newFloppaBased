const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
        name: "pull",
        run: async (client, message, args) => {
                if (!message.member.permissions.has("MANAGE_CHANNELS")) return;

                const member = message.mentions.members.first();
                if (!member) return message.reply("Please mention a member!");
                if (!member.voice.channel)
                        return message.reply(
                                "The member you mentioned is not in a vc (voice channel)"
                        );

                if (!message.member.voice.channel)
                        return message.reply("Please join a voice channel");
                member.voice.setChannel(message.member.voice.channel);
                message.channel.send("Moved member!");                
        },
};