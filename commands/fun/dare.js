const Discord = require("discord.js");
const dares = require('../../dares.json');
module.exports = { 
        name: "dare",
        run: async(client, message, args) => {
        message.channel.send({
            embed: new Discord.MessageEmbed()
            .setAuthor("Dare", client.user.displayAvatarURL())
            .setDescription(`**${dares[Math.floor(Math.random() * dares.length)]}**`)
            .setFooter("Requested by " + message.author.tag)
            .setColor("RANDOM")
        });
    }
}
