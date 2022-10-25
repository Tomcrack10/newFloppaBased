const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "fox",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/fox").then(x => {
            const foxEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(foxEmbed)
        })
    }
}
