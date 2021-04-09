const email = require("./email");

const {nonAppreciation,nonAppreciationResponse} = require("../constants");

module.exports ={
    name:"badjoke",
    cooldown:0,
    requiredChannels:[],
    description:"you dont appreciate my humor",
    execute(message,args){
        
        try {
            if(nonAppreciation.some(str=>message.content
                .includes(str))){
                    const index = Math.floor(Math.random()*
                    nonAppreciation.length);
                    message.reply(nonAppreciationResponse[index]);
                }
        } catch (err) {
            console.log(e);
            message.channel.send("Something went terribly wrong and you should wait");
            email.execute(message,args);
        }

    }
}