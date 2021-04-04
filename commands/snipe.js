const {calcoholicsGuildID} = require("../constants")

module.exports = {
    name:"snipe",
    description:"reveals a deleted message",
    execute(message,args){
        const bot = args.pop();
        let username = args.join()
        let theUserSnipes = [];
        let msg;
        const theGuild = bot.guilds.cache.get(calcoholicsGuildID);
        //mono 3 atoma egw vasilhs kai botakas
        //TODO prepei na to kanw kapws na dei kai toys alloys
        const theguildmember = theGuild.members.cache.get('366236180863385600')
        console.log(theGuild,'all this',theguildmember);
        
        if(!username){
            username = theguildmember.user.username
            //PROS TO PARON o godgeon
            //randomize the user selected
            //console.log(theGuild.members.cache.filter(m=>m.presence.status === 'online'))
        }
        for(let snipe of bot.snipes){
            if(username === snipe.name){
                theUserSnipes.push(snipe.content)
            }
        }
        if(theUserSnipes.length === 0){
            msg = "he who hath not deleted shall not be sniped"
        }else{
            const randomElement = theUserSnipes[Math.floor(Math.random() * theUserSnipes.length)];
            msg = `Got yo ass ${username} ${randomElement}`;
        }
        console.log(theUserSnipes);
        message.channel.send(msg);
        
    }
}