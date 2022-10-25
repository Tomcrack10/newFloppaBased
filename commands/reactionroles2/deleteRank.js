const RankSchema = require("../../models/ranks");
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "delrank-role",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;

      const rankName = args.join(" ");
      if (!rankName) return message.reply("Please tell me a rank");
      RankSchema.findOne(
        { Guild: message.guild.id, Rank: rankName },
        async (err, data) => {
          if (data) {
            await RankSchema.findOneAndDelete({
              Guild: message.guild.id,
              Rank: rankName,
            });
            message.channel.send("The rank has been deleted.");
          } else
            return message.channel.send({content:
              "There insn't any rank found for this guild!"
            }
            );
        }
      );
    } catch (e) {
      return message.channel.send(
        `An error has occured, please try again.`
      );
    }
  },
};