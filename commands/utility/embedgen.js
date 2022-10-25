const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "embedder",
    description: "Create embed using command",
    run: async(client, message, args) =>{
        const embed = new MessageEmbed()
     
   message.channel.send("Alright, we'll start! Where do you want to send the embed? (#channel)")
       
        let ch = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });      
       message.channel.send("What will be the title of the embed?")
       
        let title = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
       
        if (title.first().content.toLowerCase() === 'none') {
           embed.setTitle(" ")      
    } else {
        embed.setTitle(title.first().content)
    }
       
        message.channel.send("What will be the description of the embed?")
        let desc = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
       
        if (desc.first().content.toLowerCase() === 'none') {
            embed.setDescription(" ")      
    } else {
        embed.setDescription(desc.first().content)
    }
       
     message.channel.send("What will be the footer of the embed?")
        let foot = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
       
        if (foot.first().content.toLowerCase() === 'none') {
            embed.setFooter(" ")      
    } else {
        embed.setFooter(foot.first().content)
    }  
       
        message.channel.send("What will be the color of the embed? (REQUIRED)")
        let col = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
       
        embed.setColor(col.first().content.toUpperCase())
       
        message.channel.send("Do you want to put a timestamp in the footer? Yes/No")
        let time = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
       
        if (time.first().content.toLowerCase() === 'yes') {
            embed.setTimestamp()      
    } else if (time.first().content.toLowerCase() === 'no') {
       embed.setFooter(foot.first().content)
    }
       
        message.channel.send("What will be the thumbnail of the embed? Type **none** for no image")
        let thu = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
       
        if (thu.first().content.toLowerCase() === 'none') {
            embed.setDescription(desc.first().content)
    } else {
        embed.setThumbnail(thu.first().content)
    }
       
        message.channel.send("What will be the image of the embed? Type **none** for no image")
        let img = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
       
        if (thu.first().content.toLowerCase() === 'none') {
            embed.setDescription(desc.first().content)
    } else {
        embed.setImage(img.first().content)
    }
 ch.first().mentions.channels.first().send(embed).catch((err) =>{
            message.channel.send("Embed is empty!")
            console.log(err)
        })
   message.channel.send("Embed successfully created!")
}
}

