
const {featureReacts,developerID,calcoholicsGuildID} = require('../constants');
//tha mporoysa na pairnw apo to message to guild
module.exports = {
    name:"feature",
    cooldown:180,
    requiredChannels:['testing-grounds','testing-ground-v2'],
    requiredRole:'',
    description:"users can recommend features and get reactions from other members",
    execute(message,args){
        const addReaction = (msg,emoji)=>{
            msg.react(emoji);
    
            setTimeout(()=>console.log('next'),500)
        
        }
        const dev = message.guild.members.cache.get(developerID);
        console.log(message);
        dev.send(`somebody suggested:\n${args.join(' ')} message in channel${message.channel}`)
        
        const theLink = `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
        dev.send(`here is a link to it ${theLink}`);
        featureReacts.map(emoji => addReaction(message,emoji))
        
        
    }
}