const backup = require('discord-backup');
module.exports = {
    name: "backup-create",
    aliases: ["bc"],
    description: "Create a backup server",
    run: async (client, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('Backup created! Here is your ID: `'+backupData.id+'` Use `i!load-backup '+backupData.id+'` to load the backup on another server!');

    }).catch(() => {

        return message.channel.send(':x: An error occurred, please report to the Support server ');

    });

}
}