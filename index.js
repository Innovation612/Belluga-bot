const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const bot = new Client({
    disableEveryone: true
})
const config = require('./config.json');
const command = require('./handlers/command');
const prefix = config.prefix;
const token = process.env.TOKEN;
const ms = require('ms');
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);
const Timeout = new Set();
["command"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);

});
bot.on('ready',()=>{
    bot.user.setActivity(`${prefix}help`)
    console.log(`Hello ${bot.user.username} is now online`)
})
bot.on('message', async message=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    const command = bot.commands.get(cmd)
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));
    if(command){
        if(command.timeout){
            if(Timeout.has(`${message.author.id}${command.name}`)){
                return message.reply(`You can only use that command every ${ms(command.timeout)}!`)
            } else {
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout)
            }
        }
        command.run(bot,message,args)
    }
})

bot.on('err', err =>{
    console.log(err);
})
bot.login(token)