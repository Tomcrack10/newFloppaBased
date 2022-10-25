const { country } = require("popcat-wrapper"),
{ MessageEmbed } = require("discord.js")
module.exports = {
    name: "country", 
    run: async(client, message, args) => {
 const content = args.join(" ")
 if(!content) return message.channel.send("Please provide a country name!") 
 try {
    const c = await country(content)
    const embed = new MessageEmbed()
    .setTitle(c.name)
    .setColor("4169e1")
    .setThumbnail(c.flag)
    .addField("Name", c.name, true)
    .addField("Capital", c.capital, true)
    .addField("Domain", c.domain, true)
    .addField("Region", c.region, true)
    .addField("Population", c.population, true)
    .addField("Area", c.area, true)
    .addField("Currency", `${c.currency.name} (${c.currency.short})\nSymbol: ${c.currency.symbol}`)
    message.channel.send(embed)
 } catch (error) {
    message.channel.send("Invaid country!")
 }
    }
}