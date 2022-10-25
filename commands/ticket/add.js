module.exports = {
    name: "add-user", 
    aliases: ['add-ticket'], // You Can Keep Any Name
    description: 'Add User To Ticket', // Optional

    run: async(client, message, args) => {
        
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You don't have enough permissions to use this command!");
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply("I don't have enough permission to use this command!");

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if(!user) return message.reply(`Whom Do You Want To Add To Ticket?`) // If No User Is Provided
        message.channel.updateOverwrite(user.user, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
        }) // Permissions
        message.channel.send(`Added <@${user.id}> To <#${message.channel.id}>`)
    }
}
