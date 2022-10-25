const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "panda",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/panda").then(x => {
            const pandaEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(pandaEmbed)
        })
    }
}
