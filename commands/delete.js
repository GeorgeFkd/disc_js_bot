

module.exports = {
    name:"delete",
    description:"deletes arg amount of messages",
    execute(message,args){
        
        let [arg] = args;
        arg = parseInt(arg);
        console.log(typeof arg);
        if(message.channel.type === 'text'){
            message.channel.bulkDelete(arg);
            message.reply('we ok');
        }
    }
}


