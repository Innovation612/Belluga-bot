const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'embed',
    category: 'fun',
    timeout: 5000,
    description: 'view a nice embed',
    run: async(bot,message,args)=>{
        const embed = new MessageEmbed()
        .setTitle('Title ')
        .setColor('RANDOM')
        .setURL("https://discord.js.org")
        .setAuthor("Nameeeeeee",)
        .setDescription('Description')
        .setThumbnail()
        .addField(
            { name: 'Title', value: 'Description', inline: true},
            { name: 'Title', value: 'Description', inline: true},
            { name: 'Title', value: 'Description', inline: false},

        )
        .setImage(``)
    }
}