const questions = require('../../would-you-rather.json');
const { MessageEmbed  } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
	name: "wyr",
	run: async (client, message ,args) => {
		
    let messagetext =  questions[Math.floor(Math.random() * questions.length)]
let question = messagetext.split("Would you rather ")[1]
let Option1 = question.split(" or ")[0]
let Option2 = question.split(" or ")[1]

    const embed = new MessageEmbed()
        .setAuthor(`Would You Rather`)
	.setDescription(`🅰️ | ${Option1} \n:regional_indicator_b: | ${Option2}`)	
        .setColor("RANDOM")
    
    const wyrmessage = await message.channel.send(embed);
    wyrmessage.react('🅰️')
    wyrmessage.react('🇧')
           
        },
    }
