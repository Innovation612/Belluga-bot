module.exports ={
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "fun",
    description: "clears the chat",
    run: async (client, message, args) => {
        if(message.deletable) {
            message.delete();
        }
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("you cant delete messages").then(m => m.delete(5000));
        }

        if(isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("thats not a number")
        }
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("i cant delete the message").then(m => m.delete(5000));
        }

        let deleteAmount

        if(parseInt(args[0]) > 100){
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages`))
            .catch(err => message.reply(`Something went wrong ... ${err}`))
        
    } 
    }
