const {calcoholicsGuildID} = require("../constants")
//TODO NA BEBAIWTHW OTI DOYLEYEI
module.exports = {
    name:"snipe",
    cooldown: 40,
    requiredChannels:[],
    requiredRole:'',
    description:"reveals a deleted message",
    execute(message,args){
        const bot = args.pop();

        let username = args.join(' ')
        let theguildmember,msg;
        
        const theGuild = bot.guilds.cache.get(calcoholicsGuildID);
        //This works
        
        if(!username){
            console.log('randomized')
            theguildmember = theGuild.members.cache.random();
            //console.log(theguildmember);
        }else{
            theguildmember = theGuild.members.cache.filter(user=>user.user.username===username).first()
            console.log("not randomized");
            //console.log(theguildmember)
            //this works
        }

        if(!bot.snipes.has(theguildmember.user.id)){
            msg = `he who hath not deleted shall 
            not be sniped,${theguildmember.user.username} is innocent`
        }else{
            const theUserSnipes = bot.snipes.get(theguildmember.user.id);
            const randomElement = theUserSnipes[Math.floor(Math.random() * theUserSnipes.length)];
            msg = `Got yo ass ${theguildmember.user.username} ${randomElement}`;
        }

        
        message.channel.send(msg);
    }
}