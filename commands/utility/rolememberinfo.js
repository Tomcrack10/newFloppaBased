const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "rolememberinfo",
        aliases: ['rmi', 'rmemberinfo', 'members'],
        run: async (client, message, args) => {
                if (args.includes("@everyone")) return;

                if (args.includes("@here")) return;

                if (!args[0]) return message.channel.send("**:x: Please provide a role.**")

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

                if (!role) return message.channel.send(":x: Please provide a valid role.");

                let membersWithRole = message.guild.members.cache.filter(member => {
                        return member.roles.cache.find(r => r.name === role.name);
                }).map(member => {
                        return member.user;
                })
                if (membersWithRole > 500) return message.channel.send(':x: The list is to long for me to show.')

                let roleEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Users With The ${role.name} Role:`)
                        .setDescription(membersWithRole.join("\n"));
                message.channel.send(roleEmbed);
        }
}