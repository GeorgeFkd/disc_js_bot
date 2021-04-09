const { calcoholicsGuildID,remindmeplsRoleID } = require("../constants")


module.exports = {
    name:"waterpls",
    cooldown:45,
    requiredChannels:[],
    requiredRole:'',
    description:"gives you the role to have reminders to drink water",
    async execute(message,args){
        console.log(message.author)
        const guildMember = message.guild.members.cache.get(message.author.id)
        //THAT WORKS AND LOOKS GOOD
        await guildMember.roles.add(remindmeplsRoleID);
        console.log(guildMember._roles);
        message.reply("You will now be reminded to drink water you  fundamentally incompetent human being")
        
    }

}