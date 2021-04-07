
const {remindmeplsRoleID,calcoholicsGuildID} = require("../constants");
const theid = "808391177845735445";
module.exports = {
    name:"check",
    description:"used for test purposes",
    thedata:[],
    async execute(message,args){
        console.log(message.author.id);
        message.channel.send("this doesnt do anything it is for test purposes")
        const therole = message.guild.roles.cache.get(remindmeplsRoleID);
        console.log(therole);
        console.log("Now the specific stuff");
        //console.log(therole.members.filter(user=>user._roles.includes("808391353275908116")))
        //TODO THIS ONE WORKS
        //console.log(message.guild.members.cache.filter(user=>user._roles.includes(remindmeplsRoleID)))
        const forWater = message.guild.members.cache.filter(user=>user._roles.includes(remindmeplsRoleID))
        //TODO NA KSESKARTARW AYTA EDW AFOY TA DW LIGO
        //console.log(forWater.forEach(guy=>console.log(guy._roles)))
        //console.log(therole.members.filter(user=>user._roles.includes(remindmeplsRoleID)));
        //.cache.get("366236180863385600")) egw eimai aytos mlln
        // const clowns = message.guild.roles.get(remindmeplsRoleID).members.map(m=>m.user.tag);
        // console.log(clowns);
        // let membersWithRole = message.guild.members.filter(member => { 
        //     return member.roles.find(r=>r.name=== 'remindmepls');
        // }).map(member => {
        //     return member.user.username;
        // })
        // console.log(membersWithRole)

        //console.log(me._roles.push(remindmeplsRoleID));
        //console.dir(all)//.find(m=>m._roles.includes(remindmeplsrole)))
        //const memberIterator = all.keys();
        //const stuff = all.map(member=>member._roles);
        // console.log(all);
        
        // //all.sweep(member => !member._roles.includes(theid));
        // //const [water,Nowater] = all.partition(member=>member._roles.includes("808391177845735445"))
        // console.log(all);
        // //all = all.find(member=>member._roles.includes("808391177845735445"));
        // //console.log(remindmeplsrole);
        // //console.log(message.guild.members.cache.find(user=>user._roles.includes(remindmeplsRoleID)));
        // const waters = message.guild.members.cache.find(user=>user._roles.includes(remindmeplsRoleID))
        //console.log(waters);
        //const all = await message.guild.members.fetch();

        //console.log(all,"ahahha smol");
        //console.log(clownRole.members.map(m=>m.user.tag));
        //console.log(message.guild.members.cache)//.get("320865629076979714"));
        //console.log(message.author.bot)
        //_roles to guildmember atribute
    }
}
