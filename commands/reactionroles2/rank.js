const RankSchema = require("../../models/ranks");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
        name: "claim-rank-role",
        /**
         * @param {Client} client
         * @param {Message} message
         * @param {String[]} args
         */
        run: async (client, message, args) => {
                try {
                        const rankName = args.join(" ");
                        if (!rankName) return message.channel.send("Please tell me a rank number! You can check them my using the command: i!rank-roles" );
                        RankSchema.findOne(
                                { Guild: message.guild.id, Rank: rankName },
                                async (err, data) => {
                                        if (!data) return message.channel.send("That rank doesn't exist");
                                        message.member.roles.add(data.Role);
                                        return message.channel.send(`You have received <@&${data.Role}>`);
                                }
                        );
                } catch (e) {
                        return message.channel.send(
                                        `An error has occured, please try again.`
                        );
                }
        },
};