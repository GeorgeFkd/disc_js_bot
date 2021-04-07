const {calcoholicsGuildID} = require("../constants")
//TODO NA BEBAIWTHW OTI DOYLEYEI
module.exports = {
    name:"snipe",
    description:"reveals a deleted message",
    execute(message,args){
        const bot = args.pop();

        let username = args.join(' ')
        let theguildmember,msg,theUserSnipes = [];
        
        const theGuild = bot.guilds.cache.get(calcoholicsGuildID);
        //This works
        
        if(!username){
            console.log('randomized')
            theguildmember = theGuild.members.cache.random();
            console.log(theguildmember);
        }else{
            theguildmember = theGuild.members.cache.filter(user=>user.user.username===username).first()
            console.log("not randomized");
            console.log(theguildmember)
            //this works
        }

        for(let snipe of bot.snipes){
            if(username === snipe.name){
                theUserSnipes.push(snipe.content)
            }
        }
        if(theUserSnipes.length === 0){
            msg = `he who hath not deleted shall not be sniped,${theguildmember.user.username} is innocent`
        }else{
            const randomElement = theUserSnipes[Math.floor(Math.random() * theUserSnipes.length)];
            msg = `Got yo ass ${theguildmember.user.username} ${randomElement}`;
        }
        message.channel.send(msg);
    }
}