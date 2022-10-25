const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'quote',
    aliases: ['getquote'],
    description: 'get a random quote',
    run: async(client, message, args) => {
        const axios = require('axios')
        const body = await axios.get('https://api.tovade.xyz/v1/fun/quote')
        const res = body.data
        const embed = new MessageEmbed()
        .setTitle('Random Quote')
        .setColor('ff0000')
        .setDescription(`${res.content}`)
        .setFooter(`Author: ${res.author}`)
        message.channel.send(embed)
    }
}