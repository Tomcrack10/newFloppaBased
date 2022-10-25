const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "Kicks the specified user.",

    run: async(client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("this command is restricted to staff members.")

        const mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason provided.";

        const kickz = new Discord.MessageEmbed()
        .setTitle(`You were fired from **${message.guild.name}**`)
        .setDescription(`You have been kicked from **${message.guild.name}** | ${reason}`)
        .setColor("2b60c5")
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())

        if (!args[0]) return message.reply("provide a user to kick!");

        if(!mentionMember) return message.reply("provide a valid user!");
        
        if(mentionMember.id === message.author.id) {
            return message.reply("you cannot ban yourself!")
        }

        if(!mentionMember.kickable) return message.channel.send(":x: I couldn't kick this server.");


        try {
            await mentionMember.send(`You have been kicked from **${message.guild.name}** | ${reason}`);
        } catch (err) {

        }

        try {
            await mentionMember.kick(reason);
        } catch (err) {
            return message.channel.send(":x: I couldn't kick this user.")
        }

        await mentionMember.kick({
            reason: reason
        }).then(() => message.channel.send(`:white_check_mark: \`${mentionMember.user.tag}\` **has been kicked.**`));
       message.delete()
    }
}
