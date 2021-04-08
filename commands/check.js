

const {remindmeplsRoleID,calcoholicsGuildID, clownMomentsID} = require("../constants");
const theid = "808391177845735445";
const fs = require('fs')
module.exports = {
    name:"check",
    description:"used for test purposes",
    thedata:[],
    async execute(message,args){
        const bot = args.pop();
        console.log(message.channel.id)
        const theguild = bot.guilds.cache.get(calcoholicsGuildID)
        
        const thechannel = theguild.channels.cache.get(clownMomentsID);
        
        const themessages = thechannel.messages.cache.map(msg=>msg.content);
        console.log(themessages)
        fs.appendFileSync('🤡moments.txt',themessages.join('\n'),{encoding:'utf-8'})
        //console.log(thechannel)
        // console.log(message.author.id);
        // message.channel.send("this doesnt do anything it is for test purposes")
        // //TODO ME REACTIONS NA ΕΛΕΓΧΩ ΠΟΙΑ ΚΑΝΑΛΙΑ ΦΑΙΝΟΝΤΑΙ
        // const last  = message.channel.messages.cache.first();
        // console.log(last.id);
        // const guild = thebot.guilds.cache.get(calcoholicsGuildID);
        // //console.log(message.channel.id);
        // thebot.on('messageReactionAdd',(reaction)=>{
        //     if(last.id ===reaction.message.id){
        //         console.log(reaction)
        //         const interestedUsers = Array.from(reaction.users.cache.keys());

        //     }
        // });
        
    }
}
