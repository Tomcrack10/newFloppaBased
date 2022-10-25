const db = require('quick.db')

module.exports = {
        name : 'antispam',
        run : async(client, message, args) => {
                if(args[0]=== 'on') {
                        await db.set(`antispam-${message.guild.id}`, true)
                        message.channel.send('Turned on antispam feature')
                }else if(args[0]=== 'off') {
                        await db.set(`antispam-${message.guild.id}`, false)
                        message.channel.send('Turned off antispam feature')
                }
        }
}