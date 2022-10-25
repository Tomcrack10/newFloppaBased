const { MessageEmbed } = require("discord.js")
const random = require("something-random-on-discord").Random

module.exports = {
  name: "advice",
  description: "Get some advice",
  run: async (client, message, args) => {
    
    let data = await random.getAdvice()
    const embed = new MessageEmbed()
        .setTitle("Life Advice from Imroid")
        .setDescription(data)
        message.channel.send(embed)
  }
}