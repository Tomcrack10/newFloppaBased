const Discord = require("discord.js");
const dadjoke = require('../../dadjokes.json');
module.exports = { 
        name: "dadjoke",
        run: async(client, message, args) => {
        message.channel.send({
            embed: new Discord.MessageEmbed()
            .setAuthor("Dadjoke", client.user.displayAvatarURL())
            .setDescription(`**${dadjoke[Math.floor(Math.random() * dadjoke.length)]}**`)
            .setFooter("Requested by " + message.author.tag)
            .setColor("RANDOM")
        });
    }
}
