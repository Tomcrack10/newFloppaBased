const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
        name: "fetch-bans",
        run: async (client, message, args) => {
                if (!message.member.permissions.has("BAN_MEMBERS")) return;

                const fetchBans = message.guild.fetchBans();
                const bannedMembers = (await fetchBans)
                        .map((member) => `\`${member.user.tag}\``)
                        .join(" ");
                
                if(!bannedMembers) return message.channel.send('There are no banned members on this server.');

                message.channel.send(bannedMembers)        
        },
};
