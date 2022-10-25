const db = require('quick.db') // npm i quick.db

module.exports = {
    name: "unlock-ticket", // You Can Keep Any Name
    description: 'UnLock Ticket', // Optional
    run: (client, message, args) => {
        
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You don't have enough permissions to use this command!");
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply("I don't have enough permission to use this command!");

        if(message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
        else {
            const memberinticket = db.fetch(`ticket-user_${message.channel.id}`) // Get User In Ticket
            message.channel.updateOverwrite(memberinticket, {
                SEND_MESSAGES: true
            }) // Permission
            message.channel.send(`UnLocked Ticket`)
        }
    }
}
