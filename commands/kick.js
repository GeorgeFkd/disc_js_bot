

module.exports = {
    name:"kick",
    cooldown:120,
    requiredChannels:[],
    description:"kicks someone",
    execute(message,args){
        try {
            if (message.mentions.users.size) {
                const taggedUser = message.mentions.users.first();
                message.channel.send(`You wanted to kick: ${taggedUser.username}`);
            }else{
                message.reply('Please tag a valid user!');
            } 
        } catch (err) {
            message.channel.send("Something went terribly wrong and you should wait");
            email.execute(message,args);
        }
    }

}