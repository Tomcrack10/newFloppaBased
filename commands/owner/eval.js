const { MessageEmbed } = require("discord.js");
const beautify = require("beautify");

module.exports = {
        name: "eval",
        run: async(client, message, args) => {
                if (message.author.id !== '711602696133673011' && message.author.id !== '817123942774210611') return message.channel.send("You're not the owner of this bot!")
                                .then(m => m.delete(5000));


        if (!args[0]) message.channel.send(":x: Provide something to evalute.")
                        .then(m => m.delete(5000));

        try {
                if (args.join(" ").toLowerCase().includes("token")) {
                        return;
                }

                const toEval = args.join(" ");
                const evaluated = eval(toEval);

                let embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL)
                        .setTitle("Eval")
                        .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\``)
                        .addField("Evaluated:", evaluated)
                        .addField("Type of:", typeof(evaluated));

                message.channel.send(embed);        
        } catch (e) {
                let embed = new MessageEmbed()
                        .setColor("#FF0000")
                        .setTitle(":x: An error occured")
                        .setDescription(e)
                        .setFooter(client.user.username, client.user.displayAvatarURL);

                message.channel.send(embed);        
        }
}

}
