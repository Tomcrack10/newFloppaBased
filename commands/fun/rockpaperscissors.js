const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "rockpaperscissors",
        aliases: ["rps"],
        run: async (client, message, args) => {
let embed = new MessageEmbed()
        .setTitle("RPS")
        .setColor("RANDOM")
        .setDescription("React to play!")
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        let msg = await message.channel.send(embed)
        await msg.react("🗻")
        await msg.react("✂")
        await msg.react("📰")

        const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max: 1, time: 60000, error: ["time"]}).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new MessageEmbed()
                .setTitle("RPS Result")
                .addField("Your Choice", `${reaction.emoji.name}`)
                .addField("Bots choice", `${me}`)
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
                await msg.edit(result)

                if((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "✂" && reaction.emoji.name === "📰") ||
                (me === "📰" && reaction.emoji.name === "🗻")) {
                    message.reply("You Lost!");
                } else if (me === reaction.emoji.name) {
                    return message.reply("Its a tie!");
                } else {
                    return message.reply("You Won!");
                }
            })
            .catch(collected => {
                message.reply('Process has been canceled, you failed to respond in time!').then(m => m.delete({ timeout: 100000 }))
                msg.delete()
            }) 

    }
}
