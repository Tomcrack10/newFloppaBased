const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "redpanda",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/red_panda").then(x => {
            const redpandaEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(redpandaEmbed)
        })
    }
}
