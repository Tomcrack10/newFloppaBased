const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cat",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/cat").then(x => {
            const catEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(catEmbed)
        })
    }
}
