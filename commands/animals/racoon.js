const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "racoon",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/racoon").then(x => {
            const racoonEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(racoonEmbed)
        })
    }
}
