
const {remindmeplsRoleID,calcoholicsGuildID} = require("../constants");
const theid = "808391177845735445";
module.exports = {
    name:"check",
    description:"used for test purposes",
    thedata:[],
    async execute(message,args){
        const thebot = args.pop();
        console.log(message.author.id);
        message.channel.send("this doesnt do anything it is for test purposes")
        // const therole = message.guild.roles.cache.get(remindmeplsRoleID);
        // console.log(therole);
        // console.log("Now the specific stuff");
        // //TODO THIS ONE WORKS
        // const forWater = message.guild.members.cache.filter(user=>user._roles.includes(remindmeplsRoleID))
        // //TODO NA KSESKARTARW AYTA EDW AFOY TA DW LIGO
        // //console.log(forWater.forEach(guy=>console.log(guy._roles)))
        // const clowns = message.guild.roles.cache.get(remindmeplsRoleID).members.map(m=>m.user.tag);
        // console.log(clowns);
        // console.log(message);
        // thebot.on('messageReaction',(user)=>{
        //     console.log(user);
        // })
        
    }
}
