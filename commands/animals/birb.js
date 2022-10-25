const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "birb",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/birb").then(x => {
            const birbEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(birbEmbed)
        })
    }
}
