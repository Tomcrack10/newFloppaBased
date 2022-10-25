const { ownerID } = require("../../owner.json")

module.exports = {
        name: "undeafen",
        description: "Undeafens a member in a voice channel",
        aliases: ["undeaf"],
        run: async (bot, message, args) => {
                if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID.includes(message.author.id)) return

                let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

                if (!member) return message.channel.send("Unable to find the mentioned user in this guild.")

                let reason = args.slice(1).join(" ");
                if (!reason) reason = "No reason provided."


                try {
                        member.voice.setDeaf(false, reason);
                        message.channel.send("✅ Member Defeaned.")
                }

                catch (error) {
                        console.log(error)
                        message.channel.send("Oops! An error occured. ")
                }

        }
}