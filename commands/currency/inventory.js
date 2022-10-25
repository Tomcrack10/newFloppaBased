const Discord = require('discord.js')
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
        name: "inventory",
        aliases: ["inv"],
        run: async (client, message, args) => {
    let result = await cs.getUserItems({
        user: message.author,
        guild: message.guild,
    });
    let inv = result.inventory.slice(0, 10)
    const embed = new Discord.MessageEmbed()
        .setDescription('Your Inventory in Empty!')
    for (key of inv) {
        embed.addField(`**${key.name}:**`, `Amount: ${key.amount}`);
        embed.setDescription('Your Inventory!')

    }
    message.channel.send(embed)



}

};
