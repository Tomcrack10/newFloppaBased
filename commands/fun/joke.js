const { MessageEmbed } = require("discord.js")
const { Random } = require("something-random-on-discord")
const random = require("something-random-on-discord").Random

module.exports = {
  name: "joke",
  description: "Get some advice",
  run: async (client, message, args) => {
    
    let data = await random.getRandomJoke()
    const embed = new MessageEmbed()
        .setTitle("Random Joke")
        .setDescription(data)
        message.channel.send(embed)
  }
}