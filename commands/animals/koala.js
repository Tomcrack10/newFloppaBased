const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "koala",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/koala").then(x => {
            const koalaEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(koalaEmbed)
        })
    }
}
