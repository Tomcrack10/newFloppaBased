const SQLite = require("better-sqlite3");
const sql = new SQLite('./mainDB.sqlite');

module.exports = {
        name: 'double-xp-role',
        aliases: [],
        description: "Set specific channel to send level up message",
        run: async (client, message, args) => {
                if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`You do not have permission to use this command!`);

                const roleName = args.join(' ')
                const levelArgs = parseInt(args[1])

                const role = message.guild.roles.cache.find(r => (r.name === roleName.toString()) || (r.id === roleName.toString().replace(/[^\w\s]/gi, '')));

                client.getRole = sql.prepare("SELECT * FROM roles WHERE guildID = ? AND roleID = ? AND level = ?");

                client.getRole.get(message.guild.id, role.id, levelArgs)

                sql.prepare("INSERT OR REPLACE INTO doubleXP (guild, role) VALUES (?, ?);").run(message.guild.id, role.id);
                return message.reply(`Double XP role has been set to ${role.name}`);

        }
}