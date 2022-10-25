const fetch = require('node-fetch')

module.exports = {
        name: "downorjustme",
        aliases: ["dojm"],
        run: async (client, message, args) => {
                const url = args[0]
                if (!url) return //send error msg here
                try {
                        await fetch(url)
                                .then(res => {
                                        if (!res) return message.reply(`:x: Looks like this website is down...`)
                                        return message.reply(`✅ This website is up and running!`)
                                })
                } catch (e) {
                        return message.reply(`:x: Looks like this website is down...`)

                }

        }

}
