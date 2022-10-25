const fetch = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "kangaroo",
    run: async (client, message, args) => {
        fetch.get("https://some-random-api.ml/img/kangaroo").then(x => {
            const kangarooEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(x.body.link);
            message.channel.send(kangarooEmbed)
        })
    }
}
