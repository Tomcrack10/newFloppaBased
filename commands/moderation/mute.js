const { MessageEmbed } = require('discord.js')
const ms = require("ms")
const Discord = require("discord.js")

module.exports = {
    name : 'mute',
    category : 'moderation',
    description: `Mute a member and don't let him talk in the server with ">mute (user) (time) (reason)".`,
    usage: "Moderators",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

        let noperm = new MessageEmbed()
        .setDescription(`You don't have permissions to run this command.`)
        .setColor("#b3666c")

        let user = message.mentions.members.first() || message.guild.member(client.users.cache.find(user => user.id === args[0]))
        let time = args[1]
        let reason = message.content.split(" ").slice(3).join(" ") || "No reason provided"

     if(!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send(noperm).then(message => message.delete( { timeout: 5000 } )).then(message.delete())
     if(!user) return message.channel.send(`${message.author}, Please provide a user to mute! - ">mute (user) (time) (reason)"`).then(message => message.delete( { timeout: 7000 } )).then(message.delete())
     if(!time) return message.channel.send(`${message.author}, Please provide a time! - ">mute (user) (time) (reason)"`).then(message => message.delete( { timeout: 7000 } )).then(message.delete())
     
     let mue = new MessageEmbed()
     .setDescription(`${user.user} has been muted | ${reason}`)
     .setColor("#e6cc93")
     message.channel.send(mue)

     let mm = new MessageEmbed()
     .setAuthor(client.user.username, client.user.displayAvatarURL( { dynamic:true } ))
     .setTitle(`You've been muted in ${message.guild.name}`)
     .setColor("#b3666c")
     .setTimestamp()
     .setFooter(`Server ID: ${message.guild.id}`)
     .addFields({
       name: "Moderator",
       value: message.author.tag,
       inline: true
     }, {
       name: "Duration",
       value: time,
       inline: true
     }, {
         name: "Reason",
         value: reason,
         inline: false
     })
     user.send(mm)


     let embede = new MessageEmbed()
     .setAuthor(`Mute | ${user.user.tag}`, user.user.displayAvatarURL( { dynamic:true } ))
     .setColor("#42e9f5")
     .setTimestamp()
     .addFields({
       name: 'Member',
       value: `${user.user}`,
       inline: true
      }, {
        name: "Duration",
        value: time,
        inline: true
      }, {
       name: 'Moderator',
       value: `${message.author}`, 
       inline: true
      }, {
       name: "Reason",
       value: `${reason}`,
       inline: false
     });

     message.channel.send(embede)

     const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        
        if(!role) {
            try {
                message.channel.send(
                  new MessageEmbed()
                  .setDescription('Muted role is not found, attempting to create muted role')
                  .setColor("RED")
                )

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'Muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send(
                  new MessageEmbed()
                  .setDescription('Muted role has sucessfully been created')
                  .setColor("GREEN")
                )
            } catch (error) {
                console.log(error)
            }
        };

     let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'Muted')
     

    user.roles.add(role2)
    setTimeout(async () => {
        user.roles.remove(role2)
        let embed = new MessageEmbed()
        .setAuthor(`Unmute | ${user.user.tag}`, user.user.displayAvatarURL( { dynamic:true } ))
        .setColor("#42e9f5")
        .setTimestamp()
        .addFields({
          name: 'Member',
          value: `${user.user}`,
          inline: true
         }, {
          name: 'Moderator',
          value: `Auto`, 
          inline: true
        });
        user.send(embed)
    }, ms(time))
    }
}