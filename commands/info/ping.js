const { Client, Discord, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Returns latency and API ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
const msg = await message.channel.send("Ping?");

    const pingembed = new MessageEmbed()
    .setAuthor("Pong!", "https://cdn.discordapp.com/attachments/737385723703066706/759616004233101362/source_1.gif")
    .setColor("RANDOM")
    .addFields(

    { name: 'Bot Latency', value: `${msg.createdTimestamp - message.createdTimestamp}ms`, inline: true },

    { name: 'API Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true }

    )
    .setFooter(`Requested by ${message.author.tag}`)

    .setTimestamp();
    
    msg.edit(``, pingembed);

    }
}
