const RankSchema = require("../../models/ranks");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "rank-roles",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      RankSchema.find({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return message.reply("There are no rank-roles!.");
        message.channel.send(
            new MessageEmbed()
            .setDescription(
              data
                .map(({ Rank, Role }, index) => {
                  return `#${index + 1} | **${Rank}** ➡ <@&${Role}>`;
                })
                .join("\n")
            ),
        );
      });
    } catch (e) {
      return message.channel.send(
        `An error has occured, please try again.`
      );
    }
  },
};