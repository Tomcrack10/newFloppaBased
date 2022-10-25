const Discord = require('discord.js');
const rp = require('request-promise')
const cheerio = require('cheerio');

module.exports = {
	name: "topic",
	run: async (client, message ,args) => {
		
			rp('https://www.conversationstarters.com/generator.php').then(html => {
				let $ = cheerio.load(html);
				let text = $('#random').text();
				text
					? message.channel.send(text)
					: message.channel.send('Oops! An error occured.');
			});

        }

}
