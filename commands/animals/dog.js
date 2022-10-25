const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "dog",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/dog").then(x => {
            const dogEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(dogEmbed)
        })
    }
}
