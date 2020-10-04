const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const bot = new Client({
  disableEveryone: true
})
const config = require('./config.json');
const prefix = config.prefix;
bot.commands = new Collection();
bot.aliases = new Collection();
const mongoose = require('mongoose')
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler=>{
  require(`./handlers/${handler}`)(bot);
  mongoose.connect("mongodb+srv://Innovation:LeoniShannon17@cluster0.9xho9.mongodb.net/Data?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
bot.on('ready',()=>{
  bot.user.setActivity(`${prefix}help`)
  console.log(`Hello! ${bot.user.username} Im online you wannabe coder`)
})
bot.on('message', async message=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    const command = bot.commands.get(cmd)
    if(!command) command= bot.commands.get(bot.aliases(cmd));
    if(command) command.run(bot,message,args)

})

bot.on('guildMemberAdd', member => {
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '👋welcome')
  
  welcomeChannel.send(`**Welcome ${member} to the server please read the rules**`)

});

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'goodbye');
  if(!channel) return;

  channel.send(`**Goodbye ${member} sorry for the inconvenience**`)
})







bot.on("messageUpdate", async (oldMessage, newMessage) => {
  require("./commands/events/guild/messageUpdate")(oldMessage, newMessage);
  })

bot.on("messageDelete", async (message) => {
  require("./commands/events/guild/messageDelete")(message);
});

bot.login(process.env.TOKEN)


})
