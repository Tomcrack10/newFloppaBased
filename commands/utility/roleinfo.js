const { MessageEmbed } = require("discord.js");

module.exports = {
        name: 'roleinfo',
        description: "Shows information for the provided role.",
        aliases: ['rinfo', 'rolei'],
        run: async (client, message, args) => {
                if (!args[0]) return message.channel.send("**:x: Please provide a role.**")
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
                if (!role) return message.channel.send(":x: Provide a valid role!");

                const status = {
                        false: "No",
                        true: "Yes"
                }

                let roleembed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Role Information for: \`${role.name}\``)
                        .setThumbnail(message.guild.iconURL())
                        .addField("**ID**", `\`${role.id}\``, true)
                        .addField("**Name**", role.name, true)
                        .addField("**Hex**", role.hexColor, true)
                        .addField("**Members**", role.members.size, true)
                        .addField("**Position**", role.position, true)
                        .addField("**Mentionable**", status[role.mentionable], true)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
                        .setTimestamp()

                message.channel.send(roleembed);
        }
}