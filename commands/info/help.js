const Discord = require('discord.js')
const client = new Discord.Client()
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");


module.exports = {
        name: "help",
        aliases: ['h'],
        description: "Shows all available bot commands.",
        run: async (client, message, args) => {

                const p = await client.prefix(message)
                const roleColor =
                        message.guild.me.displayHexColor === "#000000"
                                ? "#ffffff"
                                : message.guild.me.displayHexColor;

                if (!args[0]) {
                        let categories = [];

                        const diremojis = {
                                animals: "🐕",
                                anicurse: "🤬",
                                antiraid: "🚫",
                                backup: "💾",
                                chatbot: "💬",
                                currency: "💵",
                                fun: "🤣",
                                giveaway: "🎉",
                                image: "📷",
                                info: "ℹ",
                                leveling: "📊",
                                moderation: "⛏",
                                music: "🎵",
                                prefix: "📑",
                                reactionroles: "🎭",
                                reactionroles2: "🎭",
                                starboard: "⭐",
                                suggestion: "👍",
                                ticket: "🎫",
                                utility: "⚙",
                                welcomesetup: "🙌"
                        }
                        const ignored = ["owner", "blacklist"]
                        readdirSync("./commands/").forEach((dir) => {
                                const editedName = `${diremojis[dir]}  ${dir.toLowerCase()}`
                                if (ignored.includes(dir)) return;
                                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                                        file.endsWith(".js")
                                );

                                const cmds = commands.filter((command) => {
                                        let file = require(`../../commands/${dir}/${command}`);

                                        return !file.hidden;
                                }).map((command) => {
                                        let file = require(`../../commands/${dir}/${command}`);

                                        if (!file.name) return "No command name.";

                                        let name = file.name.replace(".js", "");

                                        return `\`${name}\``;
                                });

                                let data = new Object();

                                data = {
                                        name: editedName,
                                        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
                                };

                                categories.push(data);
                        });

                        const embed = new MessageEmbed()
                                .setAuthor("Sean's Utilities Help")
                                .addFields(categories)
                                .setDescription(
                                        `Use \`${p}help\` followed by a command name to get more additional information on a command. For example: \`${p}help ban\`.`
                                )
                                .setFooter(
                                        `Requested by ${message.author.tag}`,
                                        message.author.displayAvatarURL({ dynamic: true })
                                )
                                .setTimestamp()
                                .setColor(roleColor);
                        return message.channel.send(embed);
                } else {
                        const command =
                                client.commands.get(args[0].toLowerCase()) ||
                                client.commands.find(
                                        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                                );

                        if (!command) {
                                const embed = new MessageEmbed()
                                        .setTitle(`Invalid command! Use \`${p}help\` for all of my commands!`)
                                        .setColor("FF0000");
                                return message.channel.send(embed);
                        }

                        const embed = new MessageEmbed()
                                .setTitle(`Command: ${p}${command.name}`)
                                .addField("Prefix", `\`${p}\``)

                                .addField(
                                        "Aliases",
                                        command.aliases
                                                ? `\`${command.aliases.join("` `")}\``
                                                : "No aliases for this command."
                                )
                                .addField(
                                        "Usage",
                                        command.usage
                                                ? `\`${p}${command.name} ${command.usage}\``
                                                : `\`${p}${command.name}\``
                                )
                                .addField(
                                        "Description",
                                        command.description
                                                ? command.description
                                                : "No description for this command."
                                )
                                .setFooter(
                                        `Requested by ${message.author.tag}`,
                                        message.author.displayAvatarURL({ dynamic: true })
                                )
                                .setTimestamp()
                                .setColor(roleColor);
                        return message.channel.send(embed);
                }
        },
};
