const { ownerID } = require("../../owner.json")

module.exports = {
        name: "deafen",
        description: "Deafens a member in a voice channel.",
        aliases: ["deaf"],
    run: async(client, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**You can't use that command.**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Unable to find the mentioned user in this guild.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Reason Provided"


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("✅ Member deafened.")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("Oops! An unknown error occured.")
        }

    }
}