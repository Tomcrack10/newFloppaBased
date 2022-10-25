const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say-embed",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const sayEmbed = new MessageEmbed()
        .setDescription(args.join(" "))

    message.channel.send(sayEmbed)
    message.delete()
  },
};
