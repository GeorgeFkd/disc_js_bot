const email = require("./email");


module.exports = {
    name:"delete",
    cooldown:25,
    requiredChannels:[],
    description:"deletes arg amount of messages",
    execute(message,args){
        
        let [arg] = args;
        try{
            arg = parseInt(arg);
            //console.log(typeof arg);
            if(message.channel.type === 'text'){
                message.channel.bulkDelete(arg);
                message.reply('we ok');
            }
        }catch(e){
            console.log(e);
            message.channel.send("Something went terribly wrong and you should wait");
            email.execute(message,args);
        }
    }
}


