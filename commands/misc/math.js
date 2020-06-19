const {calculator} = require('../../functions')
module.exports={
    name: 'math',
    description: 'Does your math home work for you',
    category: 'misc',
    run: async(bot,message,args)=>{
        if(!args[0]) return message.channel.send('You did not specify your first number')
        if(!args[0]) return message.channel.send('You did not specify the type of sum')
        if(!args[0]) return message.channel.send('You did not specify the second number')
        message.channel.send(calculator(args[0],args[1],args[2]))
    }
}