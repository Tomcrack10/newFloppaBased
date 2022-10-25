const { MessageEmbed } = require("discord.js")
const random = require("something-random-on-discord").Random

module.exports = {
  name: "fact",
  description: "Get a random fact",
  run: async (client, message, args) => {
    
    let data = await random.getFact()
    const embed = new MessageEmbed()
        .setTitle("Random Fact")
        .setDescription(data)
        message.channel.send(embed)
  }
}