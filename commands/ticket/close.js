module.exports = {
    name: 'close-ticket', 
    aliases: ['ct'], // You Can Keep Any Name
    description: 'Close A Opened Ticket', // Optional
        run: (client, message, args) => {
        if(!message.channel.name.includes('ticket')) return message.reply('You Cant Delete A Normal Channel.') // If Non Ticket Channel Is Tried To Delete
        message.channel.delete({ timeout: 5000 }) // Delete Ticket In 5 Seconds
        message.channel.send('Deleting Ticket In 5 Seconds')
    }
}