const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lizard",
    run: async (client, message, args) => {
        fetch.get("https://nekos.life/api/v2/img/lizard").then(x => {
            const lizardEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(lizardEmbed)
        })
    }
}
