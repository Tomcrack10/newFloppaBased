const discord = require('discord.js')
const db = require('quick.db')


module.exports = {
        name: "afk",
        run: async (client, message, args) => {
                const content = args.join(" ")
                if(!content) "AFK"
                await db.set(`afk-${message.author.id}+${message.guild.id}`, content)   
                message.member
                        .setNickname(`[AFK] ${message.member.displayName.replace('[AFK]', '')}`)
                const embed = new discord.MessageEmbed()
                        .setDescription(`✅ I've set your AFK: ${content}`)
                        .setColor("#00ff04")
                                message.channel.send(embed)                

        }


};