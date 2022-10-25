console.log("Hello world from Nodejs " + process.version + "!\n");
const { Collection, Client, Discord } = require('discord.js')
const alt = require("discord-anti-alt")
const { MessageEmbed } = require('discord.js')
const { MessageCollector } = require('discord.js')
const { MessageAttachment } = require('discord.js')
const SQLite = require("better-sqlite3")
const sql = new SQLite('./mainDB.sqlite')
const fs = require('fs')
const db = require('quick.db')
const canvas = require('discord-canvas')
const path = require('path');
const cron = require('node-cron');
const { fetchMessage } = require('tech-tip-cyber');
const { Player } = require("discord-player")
const ms = require('ms')
require('discord-reply');
const client = new Client({
        disableEveryone: true,
        partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
})

const mongoose = require('mongoose')
const { Database } = require("quickmongo")
const quickmongo = new Database("mongodb+srv://MyUsernames_Sean:Gohabsgo12310@discordbot.ksg9p.mongodb.net/Data")

mongoose.connect('mongodb+srv://MyUsernames_Sean:Gohabsgo12310@discordbot.ksg9p.mongodb.net/Data', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
}).then(console.log("Connected to MongoDB"))

const CurrencySystem = require("currency-system");

const cs = new CurrencySystem;
cs.setMongoURL("mongodb+srv://MyUsernames_Sean:Gohabsgo12310@discordbot.ksg9p.mongodb.net/Data");
//sets default wallet amount when ever new user is created.
cs.setDefaultWalletAmount(100)
//sets default bank amount when ever new user is created.
cs.setDefaultBankAmount(1000)

const blacklist = require('./models/blacklist');
const prefixSchema = require('./models/prefix');
const goodbyeSchema = require('./models/goodbyeChannel');
const welcomeSchema = require("./models/welcomeChannel");

const fetch = require('node-fetch')
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.color = require('./colors.js');
client.emoji = require('./emojis.js');
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.snipes = new Collection();
client.queue = new Map();
client.vote = new Map();
client.react = new Map()
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
        require(`./handlers/${handler}`)(client);
});

const {
        GiveawaysManager
} = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
        storage: "./giveaways.json",
        updateCountdownEvery: 5000,
        default: {
                botsCanWin: false,
                embedColor: "#ff0000",
                reaction: "🎁"
        }
});
client.giveawaysManager = manager;

client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild: message.guild.id })
                .catch(err => console.log(err))

        if (data) {
                custom = data.Prefix;
        } else {
                custom = prefix;
        }
        return custom;
}

client.on(`warn`, (info) => console.log(info));

client.on(`error`, console.error);

function delay(delayInms) {
        return new Promise(resolve => {
                setTimeout(() => {
                        resolve(2);
                }, delayInms);
        });
}

client.on('ready', async () => {
        client.user.setActivity(`${prefix}help`)
        console.log(`${client.user.username} ✅`)

        const doubleXP = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'doubleXP';").get();
        if (!doubleXP['count(*)']) {
                sql.prepare("CREATE TABLE doubleXP (guild TEXT, role TEXT);").run();
        }

        const levelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levels';").get();
        if (!levelTable['count(*)']) {
                sql.prepare("CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, xp INTEGER, level INTEGER, totalXP INTEGER);").run();
        }

        client.getLevel = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
        client.setLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");
        // Role table for levels
        const roleTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'roles';").get();
        if (!roleTable['count(*)']) {
                sql.prepare("CREATE TABLE roles (guildID TEXT, roleID TEXT, level INTEGER);").run();
        }

        const settingsTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'settings';").get();
        if (!settingsTable['count(*)']) {
                sql.prepare("CREATE TABLE settings (guild TEXT PRIMARY KEY, levelUpMessage TEXT, customXP INTEGER, customCooldown INTEGER);").run();
        }

        const channelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel';").get();
        if (!channelTable['count(*)']) {
                sql.prepare("CREATE TABLE channel (guild TEXT PRIMARY KEY, channel TEXT);").run();
        }

        const bgTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'background';").get();
        if (!bgTable['count(*)']) {
                sql.prepare("CREATE TABLE background (user TEXT, guild TEXT, bg TEXT)").run();
        }

        client.getBg = sql.prepare("SELECT bg FROM background WHERE user = ? AND guild = ?");
        client.setBg = sql.prepare("INSERT OR REPLACE INTO background (user, guild, bg) VALUES (@user, @guild, @bg);");

        const blacklistTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'blacklistTable';").get();
        if (!blacklistTable['count(*)']) {
                sql.prepare("CREATE TABLE blacklistTable (guild TEXT, typeId TEXT, type TEXT, id TEXT PRIMARY KEY);").run();
        }

        setInterval(() => {
                let member;
                client.guilds.cache.forEach(async guild => {
                        await delay(15);
                        member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
                        //if not connected
                        if (!member.voice.channel)
                                return;
                        //if alone 
                        if (member.voice.channel.members.size === 1) { return member.voice.channel.leave(); }
                })
        })
})


client.on('message', async (message) => {
        if (message.author.bot) return;
        const status = db.get(`${message.author.id}_${message.guild.id}_afk`);
        if (db.has(`afk-${message.author.id}+${message.guild.id}`)) { // if he has afk
                const oldReason = db.get(`afk-${message.author.id}+${message.guild.id}`) // get the reason 
                await db.delete(`afk-${message.author.id}+${message.guild.id}`) // delete it after u get it
                message.reply(`welcome back! I've taken away your AFK status. (${oldReason})`) // send this msg
                await message.member
                        .setNickname(message.author.username)
        }


        // checking if someone mentioned the afk person

        if (message.mentions.members.first()) { // if someone mentioned the person
                if (db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) { // db will check if he is afk
                        message.reply(message.mentions.members.first().user.tag + " is currently AFK: " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) // if yes, it gets from the db the afk msg and send it
                }
        }

        const p = await client.prefix(message)
        if (message.mentions.users.first()) {
                if (message.mentions.users.first().id === '817438387115524096') return message.channel.send(`My prefix in **${message.guild.name}** is \`${p}\`.`)
        }

        if (!message.content.startsWith(p)) return;
        blacklist.findOne({ id: message.author.id }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                        if (!message.guild) return;
                        if (!message.member) message.member = await message.guild.fetchMember(message);
                        const args = message.content.slice(p.length).trim().split(/ +/g);
                        const cmd = args.shift().toLowerCase();
                        if (cmd.length == 0) return;
                        let command = client.commands.get(cmd)
                        if (!command) command = client.commands.get(client.aliases.get(cmd));
                        if (command) command.run(client, message, args)
                } else {
                        message.channel.send('You are blacklisted!')
                }
        })

})

const usersMap = new Map();
const LIMIT = 5;
const TIME = 60000;
const DIFF = 3000;

client.on('message', async (message) => {
        if (message.author.bot) return;
        if (db.has(`antispam-${message.guild.id}`) === false) return;
        if (usersMap.has(message.author.id)) {
                const userData = usersMap.get(message.author.id);
                const { lastMessage, timer } = userData;
                const difference = message.createdTimestamp - lastMessage.createdTimestamp;
                let msgCount = userData.msgCount;
                console.log(difference);

                if (difference > DIFF) {
                        clearTimeout(timer);
                        console.log('Cleared Timeout');
                        userData.msgCount = 1;
                        userData.lastMessage = message;
                        userData.timer = setTimeout(() => {
                                usersMap.delete(message.author.id);
                                console.log('Removed from map.')
                        }, TIME);
                        usersMap.set(message.author.id, userData)
                }
                else {
                        ++msgCount;
                        if (parseInt(msgCount) === LIMIT) {
                                let muterole = message.guild.roles.cache.find(role => role.name === 'Muted');
                                if (!muterole) {
                                        try {
                                                muterole = await message.guild.roles.create({
                                                        name: "Muted",
                                                        permissions: []
                                                })
                                                message.guild.channels.cache.forEach(async (channel, id) => {
                                                        await channel.createOverwrite(muterole, {
                                                                SEND_MESSAGES: false,
                                                                ADD_REACTIONS: false
                                                        })
                                                })
                                        } catch (e) {
                                                console.log(e)
                                        }
                                }
                                message.member.roles.add(muterole);
                                message.reply('you have been muted for one minute (spaming)!');
                                setTimeout(() => {
                                        message.member.roles.remove(muterole);
                                        message.reply('you have been unmuted dont spam again!')
                                }, TIME);
                        } else {
                                userData.msgCount = msgCount;
                                usersMap.set(message.author.id, userData);
                        }
                }
        }
        else {
                let fn = setTimeout(() => {
                        usersMap.delete(message.author.id);
                        console.log('Removed from map.')
                }, TIME);
                usersMap.set(message.author.id, {
                        msgCount: 1,
                        lastMessage: message,
                        timer: fn
                });
        }
})

client.on('guildMemberAdd', async (member, user) => {
        if (user.bot) return;
        if (db.has(`captcha-${member.guild.id}`) === false) return;
        const url = 'https://api.no-api-key.com/api/v2/captcha';
        try {
                fetch(url)
                        .then(res => res.json())
                        .then(async json => {
                                console.log(json)
                                const msg = await member.send(
                                        new MessageEmbed()
                                                .setTitle('Please enter the captcha')
                                                .setImage(json.captcha)
                                                .setColor("RANDOM")
                                )
                                try {
                                        const filter = (m) => {
                                                if (m.author.bot) return;
                                                if (m.author.id === member.id && m.content === json.captcha_text) return true;
                                                else {
                                                        msg.channel.send("You have answered the captcha incorrectly!")
                                                }
                                        };
                                        const response = await msg.channel.awaitMessages(filter, {
                                                max: 1,
                                                time: 30000,
                                                errors: ['time']
                                        })
                                        if (response) {
                                                msg.channel.send('Congrats, you have answered the captcha.')
                                        }
                                } catch (error) {
                                        msg.channel.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly.`)
                                        member.kick()
                                }
                        })
        } catch (error) {
                console.log(error)
        }
})

client.on("guildCreate", (guild) => {
        let channelToSend;

        guild.channels.cache.forEach((channel) => {
                if (
                        channel.type === "text" &&
                        !channelToSend &&
                        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
                )
                        channelToSend = channel;
        });

        if (!channelToSend) return;

        channelToSend.send(
                new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
                        .setDescription("Sup, my name is Sean's Utilities. Thanks for inviting me! To get started please do s?help.")
                        .setColor("GREEN")
                        .setTimestamp()
        );

});

client.on("voiceStateUpdate", async (oldState, newState) => {
        const user = await client.users.fetch(newState.id);
        const member = newState.guild.member(user);

        if (!oldState.channel && newState.channel.id === "") {
                const channel = await newState.guild.channels.create(user.tag, {
                        type: "voice",
                        parent: newState.channel.parent,
                });
                member.voice.setChannel(channel);
                voiceCollection.set(user.id, channel.id);
        } else if (!newState.channel) {
                if (oldState.channelID === voiceCollection.get(newState.id))
                        return oldState.channel.delete();
        }
});

const { MessageReaction, User } = require("discord.js");
const Db = require("./packages/reactionrole/models/schema.js")
const reactionCooldown = new Set();
const moment = require('moment')
const GuildDB = require('./database/guild');
const botCooldown = new Set();

client.on('messageReactionAdd', async (messageReaction, user) => {
        //ignore bot's reactions
        if (user.bot) return;

        const { message, emoji } = messageReaction;

        // fetch the member
        const member = message.guild.members.cache.get(user.id);


        const guildDB = await GuildDB.findOne({
                guildId: message.guild.id
        })

        //find in database
        await Db.findOne({
                guildid: message.guild.id,
                reaction: emoji.toString(),
                msgid: message.id,
        },

                async (err, db) => {

                        // return if reaction isnt in database
                        if (!db) return;

                        // return if the reaction's message ID is different than in database
                        if (message.id != db.msgid) return;

                        // fetch the role to give
                        const rrRole = message.guild.roles.cache.get(db.roleid);

                        // return if role doesn't exist
                        if (!rrRole) return;

                        // return (avoid rate limit + SPAM)
                        if (botCooldown.has(message.guild.id)) return;

                        let guild = client.guilds.cache.get(db.guildid);
                        let guildName = guild.name;

                        let slowDownEmbed = new MessageEmbed()
                                .setDescription(`Slow Down There, You're on a cooldown\n\n**Role Name:** ${rrRole.name}\n**Guild Name:** ${guildName}`)
                                .setColor(message.client.color.red)

                        // add reaction Embed
                        let addEmbed = new MessageEmbed()
                                .setAuthor('Role Added', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png`, `${message.url}`)
                                .setDescription(`You have recieved the **${rrRole.name}** Role by reacting in ${guildName}`)
                                .setColor(message.client.color.green)


                        // remove reaction Embed
                        let remEmbed = new MessageEmbed()
                                .setAuthor('Role Removed', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png`, `${message.url}`)
                                .setDescription(`You have removed the **${rrRole.name}** Role by reacting in ${guildName}`)
                                .setColor(message.client.color.green)

                        //Reaction Role Error
                        let errorReaction = new MessageEmbed()
                                .setAuthor('Reaction Role Error', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png`, `${message.url}`)
                                .setDescription(` Failed to Add the role, since I'm Missing the Manage Roles Permission.\n\nPlease let an admin Know.`)
                                .setColor(message.client.color.green)

                        if (reactionCooldown.has(user.id)) {

                                //Add user to a cooldown if he is spamming
                                user.send(slowDownEmbed).catch(() => { });
                                botCooldown.add(message.guild.id)
                                setTimeout(() => {
                                        botCooldown.delete(message.guild.id)
                                }, 4000)


                        }


                        //checking for options 


                        if (db.option === 1) {
                                try {
                                        if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {



                                                await member.roles.add(rrRole).catch(() => { })
                                                if (guildDB.reactionDM === true) {
                                                        member.send(addEmbed).catch(() => { })
                                                }
                                                reactionCooldown.add(user.id);
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 2000);
                                        }
                                } catch {


                                        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
                                        botCooldown.add(message.guild.id)
                                        setTimeout(() => {
                                                botCooldown.delete(message.guild.id)
                                        }, 6000)
                                        return member.send(errorReaction).catch(() => { })
                                }
                        }

                        if (db.option === 2) {
                                try {
                                        if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
                                                await member.roles.add(rrRole).catch(() => { })
                                                if (guildDB.reactionDM === true) {
                                                        member.send(addEmbed).catch(() => { })
                                                }
                                                reactionCooldown.add(user.id);
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 2000);
                                        }
                                } catch (err) {
                                        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
                                        botCooldown.add(message.guild.id)
                                        setTimeout(() => {
                                                botCooldown.delete(message.guild.id)
                                        }, 6000)
                                        return member.send(errorReaction).catch(() => { })
                                }
                        }

                        if (db.option === 3) {
                                try {
                                        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
                                                await member.roles.remove(rrRole).catch(() => { })
                                                if (guildDB.reactionDM === true) {
                                                        member.send(remEmbed).catch(() => { })
                                                }
                                                reactionCooldown.add(user.id);
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 2000);
                                        }
                                } catch (err) {
                                        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
                                        botCooldown.add(message.guild.id)
                                        setTimeout(() => {
                                                botCooldown.delete(message.guild.id)
                                        }, 6000)
                                        return member.send(errorReaction).catch(() => { })
                                }
                        }

                        if (db.option === 4) {
                                try {
                                        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
                                                await member.roles.remove(rrRole).catch(() => { })
                                                reactionCooldown.add(user.id);
                                                if (guildDB.reactionDM === true) {
                                                        member.send(remEmbed).catch(() => { })
                                                }
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 2000);
                                        }
                                } catch (err) {
                                        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
                                        botCooldown.add(message.guild.id)
                                        setTimeout(() => {
                                                botCooldown.delete(message.guild.id)
                                        }, 6000)
                                        return member.send(errorReaction).catch(() => { })
                                }
                        }

                        if (db.option === 5) {
                                try {
                                        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
                                                await member.roles.remove(rrRole);
                                                message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(() => { })

                                                if (guildDB.reactionDM === true) {
                                                        member.send(remEmbed).catch(() => { })
                                                }
                                                reactionCooldown.add(user.id);
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 2000);
                                        }
                                } catch (err) {
                                        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
                                        botCooldown.add(message.guild.id)
                                        setTimeout(() => {
                                                botCooldown.delete(message.guild.id)
                                        }, 6000)
                                        return member.send(errorReaction).catch(() => { })
                                }
                        }


                        if (db.option === 6) {
                                try {



                                        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {

                                                message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(() => { })
                                                await member.roles.remove(rrRole).catch(() => { })

                                                reactionCooldown.add(user.id);
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 5000);

                                                return;

                                        } else if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {

                                                message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(() => { })
                                                await member.roles.add(rrRole).catch(() => { })

                                                if (guildDB.reactionDM === true) {
                                                        member.send(addEmbed).catch(() => { })
                                                }
                                                reactionCooldown.add(user.id);
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 5000);
                                        }

                                } catch (err) {

                                        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
                                        botCooldown.add(message.guild.id)
                                        setTimeout(() => {
                                                botCooldown.delete(message.guild.id)
                                        }, 6000)
                                        return member.send(errorReaction).catch(() => { })
                                }
                        }


                });

})

client.on('messageReactionRemove', async (messageReaction, user) => {

        //ignore bot's reactions
        if (user.bot) return;

        const { message, emoji } = messageReaction;

        // fetch the member
        const member = message.guild.members.cache.get(user.id);


        const guildDB = await GuildDB.findOne({
                guildId: message.guild.id
        })

        //find in database
        await Db.findOne({
                guildid: message.guild.id,
                reaction: emoji.toString(),
                msgid: message.id,
        },

                async (err, db) => {

                        // return if reaction isnt in database
                        if (!db) return;

                        // return if the reaction's message ID is different than in database
                        if (message.id != db.msgid) return;

                        // fetch the role to give
                        const rrRole = message.guild.roles.cache.get(db.roleid);

                        // return if role doesn't exist
                        if (!rrRole) return;

                        // return (avoid rate limit + SPAM)
                        if (botCooldown.has(message.guild.id)) return;

                        let guild = client.guilds.cache.get(db.guildid);
                        let guildName = guild.name;

                        let slowDownEmbed = new MessageEmbed()
                                .setDescription(`Slow Down There, You're on a cooldown\n\n**Role Name:** ${rrRole.name}\n**Guild Name:** ${guildName}`)
                                .setColor(message.client.color.red)

                        // add reaction Embed
                        let addEmbed = new MessageEmbed()
                                .setAuthor('Role Added', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png`, `${message.url}`)
                                .setDescription(`You have recieved the **${rrRole.name}** Role by reacting in ${guildName}`)
                                .setColor(message.client.color.green)


                        // remove reaction Embed
                        let remEmbed = new MessageEmbed()
                                .setAuthor('Role Removed', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png`, `${message.url}`)
                                .setDescription(`You have removed the **${rrRole.name}** Role by reacting in ${guildName}`)
                                .setColor(message.client.color.green)

                        //Reaction Role Error
                        let errorReaction = new MessageEmbed()
                                .setAuthor('Reaction Role Error', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png`, `${message.url}`)
                                .setDescription(` Failed to Add the role, since I'm Missing the Manage Roles Permission.\n\nPlease let an admin Know.`)
                                .setColor(message.client.color.green)




                        //checking for options 

                        // cooldown system
                        if (reactionCooldown.has(user.id)) return



                        if (db.option === 1) {
                                try {
                                        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
                                                await member.roles.remove(rrRole).catch(() => { })
                                                reactionCooldown.add(user.id);
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 2000);

                                                if (guildDB.reactionDM === true) {
                                                        if (botCooldown.has(message.guild.id)) return;
                                                        member.send(remEmbed).catch(() => { })
                                                        botCooldown.add(message.guild.id)
                                                        setTimeout(() => {
                                                                botCooldown.delete(message.guild.id)
                                                        }, 4000)


                                                }

                                        }
                                } catch (err) {
                                        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

                                        if (botCooldown.has(message.guild.id)) return;
                                        botCooldown.add(message.guild.id)
                                        setTimeout(() => {
                                                botCooldown.delete(message.guild.id)
                                        }, 6000)
                                        return member.send(errorReaction).catch(() => { })
                                }
                        }

                        if (db.option === 4) {
                                try {
                                        if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
                                                await member.roles.add(rrRole).catch(() => { })
                                                if (guildDB.reactionDM === true) {
                                                        member.send(addEmbed).catch(() => { })
                                                }
                                                reactionCooldown.add(user.id);
                                                setTimeout(() => {
                                                        reactionCooldown.delete(user.id)
                                                }, 2000);
                                        }
                                } catch (err) {
                                        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
                                        if (botCooldown.has(message.guild.id)) return;
                                        botCooldown.add(message.guild.id)
                                        setTimeout(() => {
                                                botCooldown.delete(message.guild.id)
                                        }, 6000)
                                        return member.send(errorReaction).catch(() => { })
                                }
                        }



                }
        );
});

client.on('guildDelete', async (guild) => {
        prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                        prefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log('deleted data.'))
                }
        })
})

client.on('guildMemberRemove', async (member) => {
        goodbyeSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
                if (!data) return;
                const user = member.user;
                const image = await new canvas.Goodbye()
                        .setUsername(user.username)
                        .setDiscriminator(user.discriminator)
                        .setMemberCount(member.guild.memberCount)
                        .setGuildName(member.guild.name)
                        .setAvatar(user.displayAvatarURL({ format: "png" }))
                        .setColor("border", "#8015EA")
                        .setColor("username-box", "#8015EA")
                        .setColor("discriminator-box", "#8015EA")
                        .setColor("message-box", "#8015EA")
                        .setColor("title", "#8015EA")
                        .setColor("avatar", "#8015EA")
                        .setBackground("https://st2.depositphotos.com/1265894/10726/i/950/depositphotos_107269762-stock-photo-winter-ice-frost-frozen-background.jpg")
                        .toAttachment();

                const attachment = new MessageAttachment(
                        (await image).toBuffer(),
                        "googdbye-image.png"
                );

                const channel = member.guild.channels.cache.get(data.Channel);
                channel.send(`:sob: It seems like ${member} has left us...`, attachment)
        })
})

client.on('guildMemberAdd', async (member) => {
        welcomeSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
                if (!data) return;
                const user = member.user;
                const image = await new canvas.Welcome()
                        .setUsername(user.username)
                        .setDiscriminator(user.discriminator)
                        .setMemberCount(member.guild.memberCount)
                        .setGuildName(member.guild.name)
                        .setAvatar(user.displayAvatarURL({ format: "png" }))
                        .setColor("border", "#8015EA")
                        .setColor("username-box", "#8015EA")
                        .setColor("discriminator-box", "#8015EA")
                        .setColor("message-box", "#8015EA")
                        .setColor("title", "#8015EA")
                        .setColor("avatar", "#8015EA")
                        .setBackground("https://st2.depositphotos.com/1265894/10726/i/950/depositphotos_107269762-stock-photo-winter-ice-frost-frozen-background.jpg")
                        .toAttachment();

                const attachment = new MessageAttachment(
                        (await image).toBuffer(),
                        "welcome-image.png"
                );

                const channel = member.guild.channels.cache.get(data.Channel);
                channel.send(`:wave: Hello ${member}, welcome to ${member.guild.name}!`, attachment)
        })
})

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
        if (member.user.bot) return;
        let conditionRole;

        let conditionsRoles = require(path.resolve(path.join(__dirname + '/database/conditionRole.json')));
        if (conditionsRoles[giveaway.messageID]) {
                conditionRole = conditionsRoles[giveaway.messageID].conditionRole;
        }
        if (conditionRole != 'none') {
                if (member.roles.cache.find(r => r.id === conditionRole)) {
                        member.send(
                                new MessageEmbed()
                                        .setAuthor(member.user.tag, member.user.displayAvatarURL({
                                                format: 'png',
                                                dynamic: 'true'
                                        }))
                                        .setColor('GREEN')
                                        .setDescription(`Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been approved. **Good luck !**`)
                                        .setFooter(`Giveaway by ${reaction.message.author.tag}`)
                                        .setTimestamp()
                        );
                        return;
                } else {
                        reaction.users.remove(member.id)
                        let role = reaction.message.guild.roles.cache.find(r => r.id === conditionRole);
                        member.send(
                                new MessageEmbed()
                                        .setAuthor(member.user.tag, member.user.displayAvatarURL({
                                                format: 'png',
                                                dynamic: 'true'
                                        }))
                                        .setColor('RED')
                                        .setDescription(`Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been denied. To enter, you need the \`${role.name}\` role.`)
                                        .setFooter(`Giveaway by ${reaction.message.author.tag}`)
                                        .setTimestamp()
                        );
                        return;
                }
        }

});

client.on('voiceStateUpdate', (old, New) => {
        if (old.id !== client.user.id) return
        if (old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.snipes = new Map()
client.on('messageDelete', function(message, channel) {

        client.snipes.set(message.channel.id, {
                content: message.content,
                author: message.author.tag,
                image: message.attachments.first() ? message.attachments.first().proxyURL : null
        })

})

client.on("message", async (message) => {

        let channel = await quickmongo.get(`chatbot_${message.guild.id}`);
        if (!channel) return;
        var sChannel = message.guild.channels.cache.get(channel);
        if (message.author.bot || sChannel.id !== message.channel.id) return;
        message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
        if (message.content.includes(`@`)) {
                return sChannel.send(`🚫 **${message.author.username}**, please do not mention anyone when using the chatbot.`);
        }
        sChannel.startTyping();
        if (!message.content) return sChannel.send("Please say something.");

        fetch(`https://api.deltaa.me/chatbot?message=${encodeURIComponent(message.content)}&name=DaChatBot&user=${message.author.username}&gender=Male`)

                .then(res => res.json())
                .then(data => {
                        sChannel.send(`${data.message}`);
                });
        sChannel.stopTyping();

});

client.on('guildMemberAdd', async member => {
        const altdays = db.get(`altdays.${member.guild.id}`);
        const altchannel = db.get(`antialt.${member.guild.id}`);
        if (!altdays || !altchannel) return;

        const account = new alt.config({
                days: parseInt(altdays),
                options: 'kick'
        }); //so if alt account user join your server, the user will got kick

        let running = account.run(member);
        let profile = alt.profile(member);
        if (running) {
                const embed = new MessageEmbed()
                        .setAuthor(member.user.tag, member.user.displayAvatarURL())
                        .setColor("RANDOM")
                        .addField("Account Age: ", profile.userAge, true)
                        .addField("Age Requirement: ", altdays, true)
                        .addField("Account Created", profile.date.userDateCreated, true)
                        .setTimestamp()
                return member.guild.channels.cache.get(altchannel).send(embed);
        }

})

client.on("roleDelete", async role => {
        const user = await role.guild.fetchAuditLogs({
                type: 'ROLE_DELETE'
        }).then(audit => audit.entries.first())
        const entry = user.executor
        let author = db.get(`executer_${role.guild.id}_${entry.id}_roledelete`)
        let limts = db.get(`roledeletelimt_${role.guild.id}`)
        if (limts === null) {
                return console.log('shit');
        }
        let trustedusers = db.get(`trustedusers_${role.guild.id}`)
        if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
                return console.log('Its Trusted User');
        }
        let logs = db.get(`acitonslogs_${role.guild.id}`)
        if (author > limts) {
                db.delete(`executer_${role.guild.id}_${entry.id}`)
                console.log('trying to ban the user..')
                role.guild.members.ban(entry.id)
                let logsembed = new MessageEmbed()
                        .setTitle(`${entry.tag} was trying to raid but failed miserabely! [Breaking Roles Delete Limts]`)
                return client.channels.cache.get(logs).send(logsembed);
        }
        db.add(`executer_${role.guild.id}_${entry.id}_roledelete`, 1)
        let warn = db.get(`executer_${role.guild.id}_${entry.id}_roledelete`)
        let logsembed = new MessageEmbed()

                .setTitle(`${entry.tag} Is Deleting Roles.. [${warn || 0}/${author || 0}]`)
        client.channels.cache.get(logs).send(logsembed)
});

client.on("channelCreate", async channel => {
        const user = await channel.guild.fetchAuditLogs({
                type: 'CHANNEL_CREATE'
        }).then(audit => audit.entries.first())
        const entry = user.executor
        let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
        if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
                return console.log('Its Trusted User');
        }
        let author = db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
        let limts = db.get(`channelcreatelimts_${channel.guild.id}`)
        if (limts === null) {
                return console.log('shit');
        }
        let logs = db.get(`acitonslogs_${channel.guild.id}`)
        if (author > limts) {
                db.delete(`executer_${channel.guild.id}_${entry.id}`)
                console.log('trying to ban the user..')
                channel.guild.members.ban(entry.id)
                let logsembed = new MessageEmbed()
                        .setTitle(`${entry.tag} was trying to raid but failed miserabely! [Breaking Channel Create Limts]`)
                return client.channels.cache.get(logs).send(logsembed);
        }
        db.add(`executer_${channel.guild.id}_${entry.id}_channelcreate`, 1)
        let warn = db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
        let logsembed = new MessageEmbed()

                .setTitle(`${entry.tag} Is Creating channel.. [${warn || 0}/${author || 0}]`)
        client.channels.cache.get(logs).send(logsembed)
});

client.on("channelDelete", async channel => {
        const user = await channel.guild.fetchAuditLogs({
                type: 'CHANNEL_DELETE'
        }).then(audit => audit.entries.first())
        const entry = user.executor
        let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
        if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
                return console.log('Its Trusted User');
        }
        let author = db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
        let limts = db.get(`channeldeletelimts_${channel.guild.id}`)
        if (limts === null) {
                return console.log('shit');
        }
        let logs = db.get(`acitonslogs_${channel.guild.id}`)
        if (author > limts) {
                db.delete(`executer_${channel.guild.id}_${entry.id}`)
                console.log('trying to ban the user..')
                channel.guild.members.ban(entry.id)
                let logsembed = new MessageEmbed()
                        .setTitle(`${entry.tag} was trying to raid but failed miserabely! [Breaking Delete Create Limts]`)
                return client.channels.cache.get(logs).send(logsembed);
        }
        db.add(`executer_${channel.guild.id}_${entry.id}_channeldelete`, 1)
        let warn = db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
        let logsembed = new MessageEmbed()

                .setTitle(`${entry.tag} Is Deleting channel.. [${warn || 0}/${author || 0}]`)
        client.channels.cache.get(logs).send(logsembed)
});
client.on("guildMemberRemove", async member => {
        const entry1 = await member.guild
                .fetchAuditLogs()
                .then(audit => audit.entries.first());
        if (entry1.action === "MEMBER_KICK") {
                const entry2 = await member.guild
                        .fetchAuditLogs({
                                type: "MEMBER_KICK"
                        })
                        .then(audit => audit.entries.first());
                const entry = entry2.executor;
                let trustedusers = db.get(`trustedusers_${member.guild.id}`)
                if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
                        return console.log('Its Trusted User');
                }
                let author = db.get(`executer_${member.guild.id}_${entry.id}_kicklimts`)
                let limts = db.get(`kicklimts_${member.guild.id}`)
                if (limts === null) {
                        return console.log('shit');
                }
                let logs = db.get(`acitonslogs_${member.guild.id}`)
                if (author > limts) {
                        db.delete(`executer_${member.guild.id}_${entry.id}`)
                        console.log('trying to ban the user..')
                        channel.guild.members.ban(entry.id)
                        let logsembed = new MessageEmbed()
                                .setTitle(`${entry.tag} was trying to raid but failed miserabely! [Breaking Kicking Members Limts]`)
                        return client.channels.cache.get(logs).send(logsembed);
                }
                db.add(`executer_${member.guild.id}_${entry.id}_kicklimts`, 1)
                let warn = db.get(`executer_${member.guild.id}_${entry.id}_kicklimts`)
                let logsembed = new MessageEmbed()
                        .setTitle(`${entry.tag} Is Kicking Members.. [${warn || 0}/${author || 0}]`)
                client.channels.cache.get(logs).send(logsembed)

        }
})
client.on("guildMemberRemove", async member => {
        const entry1 = await member.guild
                .fetchAuditLogs()
                .then(audit => audit.entries.first());
        if (entry1.action === "MEMBER_BAN_ADD") {
                const entry2 = await member.guild
                        .fetchAuditLogs({
                                type: "MEMBER_BAN_ADD"
                        })
                        .then(audit => audit.entries.first());
                const entry = entry2.executor;
                let trustedusers = db.get(`trustedusers_${member.guild.id}`)
                if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
                        return console.log('Its Trusted User');
                }
                let author = db.get(`executer_${member.guild.id}_${entry.id}_banlimts`)
                let limts = db.get(`banlimts_${member.guild.id}`)
                if (limts === null) {
                        return console.log('shit');
                }
                let logs = db.get(`acitonslogs_${member.guild.id}`)
                if (author > limts) {
                        db.delete(`executer_${member.guild.id}_${entry.id}`)
                        console.log('trying to ban the user..')
                        member.guild.members.ban(entry.id)
                        let logsembed = new MessageEmbed()
                                .setTitle(`${entry.tag} was trying to raid but failed miserabely! [Breaking Banning Members Limts]`)
                        return client.channels.cache.get(logs).send(logsembed);
                }
                db.add(`executer_${member.guild.id}_${entry.id}_banlimts`, 1)
                let warn = db.get(`executer_${member.guild.id}_${entry.id}_banlimts`)
                let logsembed = new MessageEmbed()
                        .setTitle(`${entry.tag} Is Banning Members.. [${warn || 0}/${author || 0}]`)
                client.channels.cache.get(logs).send(logsembed)

        }
})

const ping = require('./models/ghostping')

client.on('messageDelete', async (message) => {
        ping.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) return;
                const member = message.mentions.members.first()
                if (member) {
                        if (member.id == message.author.id) return;
                        if (message.author.bot) return;
                        message.channel.send(new MessageEmbed()
                                .setTitle(`Ghost Ping Detected`)
                                .addField(`Author`, message.author.tag, true)
                                .addField(`Content`, message.content, true)
                                .setColor("RANDOM")
                                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                        )
                }
        })
})

const TicketData = require('./models/TicketData');
const cooldown = new Set();

client.on('messageReactionAdd', async (reaction, user) => {
        if (user.bot) return;

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        if (!reaction.message.guild) return;

        const data = await TicketData.findOne({
                GuildID: reaction.message.guild.id
        });
        if (!data) return;
        if (reaction.message.partial) await reaction.message.fetch();

        if (reaction.emoji.name === '🎟' && reaction.message.id === data.MessageID) {
                if (cooldown.has(user.id)) {
                        reaction.users.remove(user.id);
                        return;
                }
                reaction.users.remove(user.id);
                data.TicketNumber += 1;
                await data.save();
                const channel = await reaction.message.guild.channels.create(`ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {
                        type: 'text',
                        permissionOverwrites: [{
                                id: reaction.message.guild.id,
                                deny: ['VIEW_CHANNEL'],
                        },],
                });
                await channel.createOverwrite(user, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        SEND_TTS_MESSAGES: false
                });
                await channel.createOverwrite(data.WhitelistedRole, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        SEND_TTS_MESSAGES: false
                }).then(async channel => {
                        db.set(`ticket-user_${channel.id}`, user.id) // Set User ID
                        db.add(`ticket-user-total_${user.id}`, 1) // Add Ticket Count
                        channel.send(`<@${user.id}> Welcome!`, new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Welcome To Your Ticket')
                                .setDescription(`
Please Provide Your Issues
React With ⛔ To Close Ticket
React With 🔒 To Lock Ticket
React With 🔓 To UnLock Ticket
React With 📃 To Get TranScript Of Ticket
                `)
                                .setTimestamp()
                                .setFooter(`Ticket For ${user.username}#${user.discriminator}`)
                        ).then(message => {
                                message.react('⛔') // React To Message
                                message.react('🔒') // React To Message
                                message.react('🔓') // React To Message
                                message.react('📃') // React To Message
                        })
                })
        }
        client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch()
                if (reaction.partial) await reaction.fetch()
                if (user.bot) return // If Bot Reacts It Won't Work

                if (reaction.emoji.name === '⛔') {
                        reaction.users.remove(user.id);
                        // if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return reaction.message.channel.send('You Don\'t Have Permission To Close Ticket') // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                        if (!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                        else if (!reaction.message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
                        else {
                                reaction.message.channel.send('Deleting Channel In 5 Seconds')
                                setTimeout(() => reaction.message.channel.delete(), 5000)
                                db.delete(`ticket-user_${reaction.message.channel.id}`)
                                db.add(`ticket-user-closed_${user.id}`, 1)
                        }
                } else if (reaction.emoji.name === '🔒') {
                        reaction.users.remove(user.id);
                        // if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return reaction.message.channel.send('You Don\'t Have Permission To Close Ticket') // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                        if (!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                        else if (!reaction.message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
                        else {
                                const memberinticket = db.fetch(`ticket-user_${reaction.message.channel.id}`)
                                reaction.message.channel.updateOverwrite(memberinticket, {
                                        SEND_MESSAGES: false
                                }) // Permission
                                // reaction.message.channel.send('Locked Ticket')
                        }
                } else if (reaction.emoji.name === '🔓') {
                        reaction.users.remove(user.id);
                        // if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return reaction.message.channel.send('You Don\'t Have Permission To Close Ticket') // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                        if (!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                        else if (!reaction.message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
                        else {
                                const memberinticket = db.fetch(`ticket-user_${reaction.message.channel.id}`)
                                reaction.message.channel.updateOverwrite(memberinticket, {
                                        SEND_MESSAGES: true
                                }) // Permission
                                // reaction.message.channel.send('UnLocked Ticket')
                        }
                } else if (reaction.emoji.name === '📃') {
                        reaction.users.remove(user.id);
                        if (!reaction.message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
                        else {
                                fetchMessage(reaction.message, 99).then((data) => { // fetchMessage(message, <10>) It Will Fetch 10 Messages From Channel, Can Be Any Number Less Than 100
                                        const file = new MessageAttachment(data, "fetched.html"); // Making Attachment File
                                        reaction.message.channel.send(file); // Send As Attachment
                                        reaction.message.channel.send('Download And Open File To See Messages');
                                });
                        }
                }
        })
})

client.on("message", async (message) => {
        if (message.author.bot) return;
        const p = await client.prefix(message)
        let words = db.get(`words_${message.guild.id}`)
        let yus = db.get(`message_${message.guild.id}`)
        if (yus === null) {
                yus = `:x: | **{user-mention}, Watch your language!**`
        }
        if (message.content.startsWith(p + "addword")) return;
        if (message.content.startsWith(p + "delword")) return;
        if (message.content.startsWith(p + "set-warn-msg")) return;
        if (message.content.startsWith(p + "words")) return;
        let pog = yus.split("{user-mention}").join("<@" + message.author.id + ">").split("{server-name}").join(message.guild.name).split("{user-tag}").join(message.author.tag).split("{user-username}").join(message.author.username)
        if (words === null) return;
        function check(msg) { //is supposed to check if message includes da swear word
                return words.some(word => message.content.toLowerCase().split(" ").join("").includes(word.word.toLowerCase()))
        }
        if (check(message.content) === true) {
                message.delete()
                message.channel.send(pog)
        }

})

client.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.emoji.name === "⭐") {
                db.add(`reactionstar_${reaction.message.id}`, 1);
                let testcount = db.fetch(`reactionstar_${reaction.message.id}`);
                var target = db.fetch(`targetstar_${reaction.message.channel.guild.id}`);
                if (!target) {
                        var target = 3;
                }
                if (testcount > target) {
                        let checking = db.fetch(`alreadyornot_${reaction.message.id}`);
                        if (checking === "yes") {
                                return;
                        }
                        db.set(`alreadyornot_${reaction.message.id}`, "yes");
                        var channel2 = db.fetch(`starboard_${reaction.message.channel.guild.id}`);
                        const channelto = client.channels.cache.get(channel2);
                        var content = reaction.message.content;
                        if (!content || content === "") {
                                var content = "Embed";
                        }
                        const embed = new MessageEmbed()
                                .setAuthor(
                                        reaction.message.author,
                                        reaction.message.author.displayAvatarURL({ dynamic: true })
                                )
                                .addField(`Content`, `${content}`)
                                .addField(`Source`, `[Jump!](${reaction.message.url})`)
                                .setFooter(`${testcount} Stars ⭐`)
                                .setTimestamp()
                                .setColor("RANDOM");

                        channelto.send(
                                `:star: ${testcount} - ${reaction.message.channel}`,
                                embed
                        );
                }
        } else {
                return;
        }
});

const talkedRecently = new Map();

client.on("message", message => {
        if (message.author.bot) return;
        if (!message.guild) return;

        const doubleXPTable = sql.prepare("SELECT role FROM 'doubleXP' WHERE guild = " + message.guild.id).get();;
        if (typeof doubleXPTable != "undefined" && typeof doubleXPTable.role != "undefined" && message.member.roles.cache.has(doubleXPTable['role'])) {
                var xpMulti = 2;
        } else {
                var xpMulti = 1;
        }

        let blacklist = sql.prepare(`SELECT id FROM blacklistTable WHERE id = ?`);
        if (blacklist.get(`${message.guild.id}-${message.author.id}`) || blacklist.get(`${message.guild.id}-${message.channel.id}`)) return;

        // get level and set level
        const level = client.getLevel.get(message.author.id, message.guild.id)
        if (!level) {
                let insertLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (?,?,?,?,?,?);");
                insertLevel.run(`${message.author.id}-${message.guild.id}`, message.author.id, message.guild.id, 0, 0, 0)
                return;
        }

        let customSettings = sql.prepare("SELECT * FROM settings WHERE guild = ?").get(message.guild.id);
        let channelLevel = sql.prepare("SELECT * FROM channel WHERE guild = ?").get(message.guild.id);

        const lvl = level.level;

        let getXpfromDB;
        let getCooldownfromDB;

        if (!customSettings) {
                getXpfromDB = 16; // Default
                getCooldownfromDB = 1000;
        } else {
                getXpfromDB = customSettings.customXP;
                getCooldownfromDB = customSettings.customCooldown;
        }

        // xp system
        const generatedXp = Math.floor(Math.random() * getXpfromDB);
        const nextXP = level.level * 2 * 250 + 250 * xpMulti;
        // message content or characters length has to be more than 4 characters also cooldown
        if (talkedRecently.get(message.author.id)) {
                return;
        } else { // cooldown is 10 seconds
                level.xp += generatedXp;
                level.totalXP += generatedXp;


                // level up!
                if (level.xp >= nextXP) {
                        level.xp = 0;
                        level.level += 1;

                        let levelUpMsg;
                        let embed = new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                .setColor("RANDOM")
                                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                .setTimestamp();

                        if (!customSettings) {
                                embed.setDescription(`**Congratulations** ${message.author}! You have now leveled up to **level ${level.level}**`);
                                levelUpMsg = `**Congratulations** ${message.author}! You have now leveled up to **level ${level.level}**`;
                        } else {
                                function antonymsLevelUp(string) {
                                        return string
                                                .replace(/{member}/i, `${message.member}`)
                                                .replace(/{xp}/i, `${level.xp}`)
                                                .replace(/{level}/i, `${level.level}`)
                                }
                                embed.setDescription(antonymsLevelUp(customSettings.levelUpMessage.toString()));
                                levelUpMsg = antonymsLevelUp(customSettings.levelUpMessage.toString());
                        }
                        // using try catch if bot have perms to send EMBED_LINKS      
                        try {
                                if (!channelLevel || channelLevel.channel == "Default") {
                                        message.channel.send(embed);
                                } else {
                                        let channel = message.guild.channels.cache.get(channelLevel.channel)
                                        const permissionFlags = channel.permissionsFor(message.guild.me);
                                        if (!permissionFlags.has("SEND_MESSAGES") || !permissionFlags.has("VIEW_CHANNEL")) return;
                                        channel.send(embed);
                                }
                        } catch (err) {
                                if (!channelLevel || channelLevel.channel == "Default") {
                                        message.channel.send(levelUpMsg);
                                } else {
                                        let channel = message.guild.channels.cache.get(channelLevel.channel)
                                        const permissionFlags = channel.permissionsFor(message.guild.me);
                                        if (!permissionFlags.has("SEND_MESSAGES") || !permissionFlags.has("VIEW_CHANNEL")) return;
                                        channel.send(levelUpMsg);
                                }
                        }
                };
                client.setLevel.run(level);
                // add cooldown to user
                talkedRecently.set(message.author.id, Date.now() + getCooldownfromDB);
                setTimeout(() => talkedRecently.delete(message.author.id, Date.now() + getCooldownfromDB))
        }
        // level up, time to add level roles
        const member = message.member;
        let Roles = sql.prepare("SELECT * FROM roles WHERE guildID = ? AND level = ?")

        let roles = Roles.get(message.guild.id, lvl)
        if (!roles) return;
        if (lvl >= roles.level) {
                if (roles) {
                        if (member.roles.cache.get(roles.roleID)) {
                                return;
                        }
                        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
                                return
                        }
                        member.roles.add(roles.roleID);
                }
        }
})

client.login(token)