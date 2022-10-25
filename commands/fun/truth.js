const Discord = require("discord.js");
const truths = require('../../truths.json');
module.exports = {
        name: "truth",
        run: async(client, message, args) => {
        message.channel.send({
            embed: new Discord.MessageEmbed()
            .setAuthor("Truth", client.user.displayAvatarURL())
            .setDescription(`**${truths[Math.floor(Math.random() * truths.length)]}**`)
            .setFooter("Requested by " + message.author.tag)
            .setColor("RANDOM")
        });
    }
}
